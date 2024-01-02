// let str = "programming, helo hi, HIeLO !! buEE";

// function checkVowels(str) {
//   let lower = str.toLowerCase();
//   let count = 0;
//   for (let i = 1; i <= lower.length; i++) {
//     if (isVowel(lower[i])) {
//       count++;
//     }
//   }
//   return count;
// }

// function isVowel(char) {
//   return ["a", "i", "e", "o", "u"].includes(char);
// }
// const result = checkVowels(str);
// console.log(result);

function checkPalindrome(str) {
  let a = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(); // removes non alphanumeric characters and also turns every uppercase letters to lowercase for better matching
  let p = a;
  for (i = 0; i <= a.length; i++) {
    if (a[i] == p[a.length - 1 - i]) {
      return true;
    } else {
      return false;
    }
  }
}

let result = checkPalindrome("abcde");
console.log(result);
