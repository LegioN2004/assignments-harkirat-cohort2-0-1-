/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  function checkPalindrome(str) {
    let a = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    let p = a;
    for (i = 0; i <= a.length; i++) {
      if (a[i] == p[a.length - 1 - i]) {
        return true;
      } else {
        return false;
      }
    }
  }

  let result = checkPalindrome(str);
  return result;
}

module.exports = isPalindrome;
