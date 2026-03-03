/*
 * Approach A: Iterative
 * Loop from 1 to n and sum each number up
 * Time:  O(n) — we visit each number once
 * Space: O(1) — only one variable to track the sum
 */
const sum_to_n_a = (n) => {
  if (n <= 0) return 0;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

/*
 * Approach B: Math formula (Gauss's formula)
 * The sum of 1 to n is always n * (n + 1) / 2 — no loop needed
 * Time:  O(1) — just one calculation, doesn't matter how big n is
 * Space: O(1) — no extra memory used
 */
const sum_to_n_b = (n) => {
  if (n <= 0) {
    return 0;
  }
  return (n * (n + 1)) / 2;
};

/*
 * Approach C: Recursive
 * sum(n) = n + sum(n - 1), keep going until we hit 0
 * Time:  O(n) — one call per number
 * Space: O(n) — each call adds a frame to the call stack
 */
const sum_to_n_c = (n) => {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
};

// quick checks
console.log(sum_to_n_a(5)); // 15
console.log(sum_to_n_b(5)); // 15
console.log(sum_to_n_c(5)); // 15

console.log(sum_to_n_a(10)); // 55
console.log(sum_to_n_b(10)); // 55
console.log(sum_to_n_c(10)); // 55

console.log(sum_to_n_a(0)); // 0
console.log(sum_to_n_b(0)); // 0
console.log(sum_to_n_c(0)); // 0
