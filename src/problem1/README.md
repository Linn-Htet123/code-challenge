# Problem 1: Three Ways to Sum to N

## Task

Provide **3 unique implementations** of the following function in JavaScript.

- **Input**: `n` — any integer
- **Output**: Summation from `1` to `n`
- **Example**: `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`
- **Assumption**: Input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`.

---

## Implementations

### A — Iterative (for loop)

```js
const sum_to_n_a = (n) => {
  if (n <= 0) return 0;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
```

Straightforward loop that accumulates the total from `1` up to `n`.

---

### B — Mathematical Formula (Gauss's Formula)

```js
const sum_to_n_b = (n) => {
  if (n <= 0) {
    return 0;
  }
  return (n * (n + 1)) / 2;
};
```

Uses the closed-form arithmetic series formula: **n × (n + 1) / 2**. This is the most efficient approach — it runs in constant time regardless of input size.

---

### C — Recursive

```js
const sum_to_n_c = (n) => {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
};
```

Decomposes the problem: `sum(n) = n + sum(n - 1)`, with a base case at `n <= 0`. Clean and expressive, though not ideal for very large `n` due to call stack limits.

---

## Complexity Comparison

| Approach      | Time Complexity | Space Complexity | Notes                              |
| ------------- | --------------- | ---------------- | ---------------------------------- |
| A — Iterative | O(n)            | O(1)             | Simple, readable                   |
| B — Formula   | O(1)            | O(1)             | Most efficient ✅                  |
| C — Recursive | O(n)            | O(n)             | Risk of stack overflow for large n |

---

## Usage

You can run the script using npm:

```bash
npm start
```

Or run it directly with Node.js:

```bash
node script.js
```

**Sample Output:**

```
15
15
15
55
55
55
0
0
0
```
