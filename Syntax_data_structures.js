//filtering and removingCommon Elements between two aeeay
const A = [1, 2, 3, 4];
const B = [2, 4];
const C = A.filter(a => !B.includes(a));
console.log(C) // returns [1, 3]