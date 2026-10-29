
const array1 = [3, 2, 1];
const array2 = [3, 4, 2, 5];

function instersects(array1, array2) {
  const set2 = new Set(array2);
  return [...new Set(array1)].filter(item => set2.has(item));
}

console.log(instersects(array1, array2));