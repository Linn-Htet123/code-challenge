# WalletPage Code Review

## Issues Found

---

### Bug #1 — Typo Error and Unused Variable

Inside `sortedBalances` `useMemo`, in the `.filter()` callback

```ts
const sortedBalances = useMemo(() => {
  return balances
    .filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      if (lhsPriority > -99) { // lhsPriority was never declared anywhere
```

`balancePriority` gets assigned but is never used. Then the very next line checks `lhsPriority` which doesn't exist anywhere in the code. The app crashes the moment this runs.

**Fix:** Replace `lhsPriority` with `balancePriority`.

---

### Bug #2 — Filter is Keeping the Wrong Balances

Inside `sortedBalances` `useMemo`, in the `.filter()` callback

```ts
.filter((balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  if (balancePriority > -99) {
    if (balance.amount <= 0) { // keeps balances with NO money
      return true;
    }
  }
  return false;
})
```

The filter is supposed to only show wallets that have money in them. But the condition `<= 0` does the opposite — it keeps the empty and negative ones, and throws away all the ones with actual value.

**Fix:** Change `<= 0` to `> 0`.

---

### Bug #3 — Sort Breaks When Two Items Have Equal Priority

Inside `sortedBalances` `useMemo`, in the `.sort()` callback

```ts
.sort((lhs: WalletBalance, rhs: WalletBalance) => {
  const leftPriority = getPriority(lhs.blockchain);
  const rightPriority = getPriority(rhs.blockchain);
  if (leftPriority > rightPriority) {
    return -1;
  } else if (rightPriority > leftPriority) {
    return 1;
  }
  // if they are equal, nothing is returned
})
```

JavaScript's sort function expects a return value of `-1`, `1`, or `0`. When two balances have the same priority, this function returns nothing (`undefined`). Different browsers deal with that differently, so the order of equal items becomes unpredictable.

**Fix:** Use subtraction instead: `return rightPriority - leftPriority`. This handles all three cases in one line.

---

### Bug #4 — `formattedBalances` is Calculated but Never Actually Used

In the `formattedBalances` variable declaration, and the `rows` variable right below it

```ts
// This creates a formatted list...
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed(),
  };
});

// ...but rows uses sortedBalances instead, not formattedBalances
const rows = sortedBalances.map(
  (balance: FormattedWalletBalance, index: number) => {
    return (
      <WalletRow
        formattedAmount={balance.formatted} // always undefined
      />
    );
  }
);
```

`formattedBalances` gets built but the code just ignores it and loops over `sortedBalances` again. Since `sortedBalances` never had a `formatted` field, `balance.formatted` comes out as `undefined` and nothing displays correctly.

**Fix:** Change `sortedBalances.map` in the `rows` variable to `formattedBalances.map`.

---

### Performance Issue #5 — `getPriority` is Rebuilt on Every Single Render

Inside the `WalletPage` component body, declared before `useMemo`

```ts
const WalletPage: React.FC<Props> = (props: Props) => {
  ...
  //recreated from scratch on every render
  const getPriority = (blockchain: any) => {
    switch (blockchain) {
      case 'Osmosis': return 100;
      ...
    }
  };
```

This function has nothing to do with the component's props or state. It's just a static lookup. But because it lives inside the component, React recreates it from scratch on every render. That's wasted work every time.

**Fix:** Move `getPriority` to outside the component entirely.

---

### Performance Issue #6 — `prices` in `useMemo` Dependency But Never Used Inside

In the `sortedBalances` `useMemo` dependency array

```ts
const sortedBalances = useMemo(() => {
  return balances
    .filter(...) // prices never referenced here
    .sort(...);  // prices never referenced here either
}, [balances, prices]); //prices listed as a dependency
```

`useMemo` will redo its work whenever something in the dependency array changes. `prices` is listed there, so every time prices update, the balances get re-filtered and re-sorted — even though the filter and sort have nothing to do with prices.

**Fix:** Remove `prices` from the `sortedBalances` `useMemo` dependency array.

---

### React Issue #7 — Using the Array Index as a Key

Inside the `rows` variable, in the `<WalletRow>` JSX

```tsx
const rows = sortedBalances.map(
  (balance: FormattedWalletBalance, index: number) => {
    return (
      <WalletRow
        key={index} // index shifts around when list is sorted or filtered
      />
    );
  },
);
```

React uses the `key` prop to keep track of which item in a list is which. When using the array index as the key and the list gets re-sorted or filtered, the indexes shift around. React gets confused about what changed and what didn't, which leads to wrong renders and UI glitches.

**Fix:** Replace `key={index}` with a stable value tied to the data, like ``key={`${balance.blockchain}-${balance.currency}`}``.

---

### TypeScript Issue #8 — `blockchain` Typed as `any`

In the `getPriority` function, declared inside the component body

```ts
const getPriority = (blockchain: any): number => { // any turns off all type checking
  switch (blockchain) { ... }
};
```

Using `any` turns off TypeScript's checks for that value completely. If a number, a null, or a typo is passed in by accident, TypeScript won't say anything. It defeats the whole reason for using TypeScript.

**Fix:** Change `blockchain: any` to `blockchain: string`.

---

### TypeScript Issue #9 — `blockchain` Field Missing From the Interface

In the `WalletBalance` interface, at the top of the file

```ts
interface WalletBalance {
  currency: string;
  amount: number;
  // blockchain is used everywhere but never declared here
}
```

The code accesses `balance.blockchain` in the filter, in the sort, and inside `getPriority`. But `blockchain` is never declared on the `WalletBalance` interface. TypeScript should be catching this as an error but it slips through because of the `any` type issue above masking it.

**Fix:** Add `blockchain: string` to the `WalletBalance` interface.

---

### Code Quality Issue #10 — Empty Interface That Does Nothing

In the `Props` interface, declared just above the component

```ts
interface Props extends BoxProps {} // completely empty, adds nothing new
```

This interface adds no new fields and changes nothing. It's just a wrapper around `BoxProps` for no reason.

**Fix:** Delete `Props` and use `BoxProps` directly, or write `type Props = BoxProps` to keep the alias name.

---

### Code Quality Issue #11 — `children` Destructured but Never Rendered

In the component body, at the top of `WalletPage`

```tsx
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props; // children pulled out here...

  ...

  return <div {...rest}>{rows}</div>; // children never placed in JSX
};
```

`children` is extracted from props but is never placed anywhere in the JSX output. Any child elements passed to `WalletPage` are silently discarded.

**Fix:** Add `{children}` inside the returned div.

```tsx
return (
  <div {...rest}>
    {rows}
    {children}
  </div>
);
```
