/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  // if (str1.length == str2.length) {
  //   return true;
  // }
  // str1 = str1.toLowerCase();
  // str1 = str2.toLowerCase();

  // let arr1 = str1.split("").sort();
  // let arr2 = str2.split("").sort();

  // function check(arr1, arr2) {
  //   for (let i = 0; i < arr1.length; i++) {
  //     if (arr1[i] == arr2[i]) {
  //       return true;
  //     }
  //   }
  // }
  // let ans = check(arr1, arr2);
  // return ans;

  str1 = str1.toUpperCase().split("").sort().join("");
  str2 = str2.toUpperCase().split("").sort().join("");
  return str1 == str2;
}
module.exports = isAnagram;
