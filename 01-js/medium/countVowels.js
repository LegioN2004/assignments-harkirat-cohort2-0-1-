/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Your code here

  function checkVowel(p, q) {
    p = { a, e, i, o, u };
    q = { A, E, I, O, U };

    let a = 0,
      b = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.length[i] == p) {
        a++;
      }
      if (str.length[i] == q) {
        b++;
      } else {
        a = 0;
      }
    }
    return (c = a + b);
  }
  // for (let i = 0; i < str.length; i++) {
  //   if (
  //     str.length[i] == a &&
  //     str.length[i] == e &&
  //     str.length[i] == i &&
  //     str.length[i] == o &&
  //     str.length[i] == u
  //   ) {
  //     a += i;
  //   }
  //   if (
  //     str.length[i] == A &&
  //     str.length[i] == E &&
  //     str.length[i] == I &&
  //     str.length[i] == O &&
  //     str.length[i] == U
  //   ) {
  //     a += i;
  //   } else {
  //     a = 0;
  //   }
  //   return a;
  // }
}

module.exports = countVowels;

