import Matrix from "./matrix.mjs";

const a = new Matrix([
    [4, 1],
    [3, 2]
]);

const b = new Matrix([
    [5, 6],
    [7, 8]
]);

console.log("Матрица A:");
console.table(a.data);

console.log("Матрица B:");
console.table(b.data);

const sorted = a.sort();

console.log("Отсортированная матрица A:");
console.table(sorted.data);

const sum = a.add(b);

console.log("A + B:");
console.table(sum.data);

const product = a.multiply(b);

console.log("A × B:");
console.table(product.data);

console.log("Исходная матрица A:");
console.table(a.data);

try {
    const c = new Matrix([
        [1, 2, 3]
    ]);

    a.add(c);
} catch (error) {
  console.error("Ошибка:", error.message);
}