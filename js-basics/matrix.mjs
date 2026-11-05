export default class Matrix {
    constructor(data) {
        if (
        !Array.isArray(data) ||
        data.length === 0 ||
        !Array.isArray(data[0]) ||
        data[0].length === 0
        ) {
        throw new Error("Матрица должна быть непустым двумерным массивом.");
        }

        const columns = data[0].length;

        for (const row of data) {
        if (!Array.isArray(row) || row.length !== columns) {
            throw new Error("Все строки должны иметь одинаковую длину.");
        }

        for (const value of row) {
            if (!Number.isFinite(value)) {
            throw new Error("Элементы матрицы должны быть конечными числами.");
            }
        }
        }

        this.data = data.map(row => [...row]);
    }

    get rows() {
        return this.data.length;
    }

    get columns() {
        return this.data[0].length;
    }

    sort() {
        const elements = this.data.flat().sort((a, b) => a - b);

        const result = this.data.map((row, i) => {
            const start = i * this.columns;
            return elements.slice(start, start + this.columns);
        });

        return new Matrix(result);
    }

    add(other) {
        if (!(other instanceof Matrix)) {
            throw new TypeError("Аргумент должен быть экземпляром Matrix");
        }

        if (this.rows !== other.rows || this.columns !== other.columns) {
            throw new Error("Для сложения размеры матриц должны совпадать");
        }

        const result = this.data.map((row, i) =>
            row.map((value, j) => value + other.data[i][j])
        );    

        return new Matrix(result);
    }

    multiply(other) {
        if (!(other instanceof Matrix)) {
            throw new TypeError("Аргумент должен быть экземпляром Matrix");
        }

        if (this.columns !== other.rows) {
            throw new Error(
                "Для умножения число столбцов первой матрицы должно совпадать с числом строк второй"
            );
        }

        const result = this.data.map(row =>
            other.data[0].map((_, j) =>
                row.reduce(
                    (sum, value, k) => sum + value * other.data[k][j],
                    0
                )
            )
        );

        return new Matrix(result);
    }
}