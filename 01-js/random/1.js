let a = [-1, -3, -7, -2, -9, -1];
let b = Number.NEGATIVE_INFINITY;
console.log(b);
if (a.length == 0) {
  return;
}
for (let i = 0; i <= a.length; i++) {
  if (a[i] > b) {
    b = a[i];
  }
}
console.log(b);
