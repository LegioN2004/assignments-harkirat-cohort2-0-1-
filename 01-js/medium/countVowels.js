/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Your code here

  function vowelCount(str) {
    // Convert the string to lowercase to handle both uppercase and lowercase vowels
    const lowerStr = str.toLowerCase();

    // Initialize a variable to store the count of vowels
    let vowelCount = 0;

    // Iterate through each character in the string
    for (let i = 0; i < lowerStr.length; i++) {
      // Check if the current character is a vowel
      if (isVowel(lowerStr[i])) {
        // If it is a vowel, increment the count
        vowelCount++;
      }
    }
    // Return the final count of vowels
    return vowelCount;
  }

  // Helper function to check if a character is a vowel
  function isVowel(char) {
    return ["a", "e", "i", "o", "u"].includes(char);
  }

  const inputString = str;
  const result = vowelCount(inputString);
  return result;
}

module.exports = countVowels;
