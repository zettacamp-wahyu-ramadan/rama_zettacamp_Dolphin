/*
Title: Unique Characters

Description:
Write a function named hasUniqueCharacters that takes a string as input and returns true if the string contains all unique characters, and false otherwise. You can assume that the string contains only lowercase alphabets (a-z).

Example:
console.log(hasUniqueCharacters("abcdefg")); // Output: true
console.log(hasUniqueCharacters("hello")); // Output: false
*/

function hasUniqueCharacters(str) {
  // Validate param only contain alphabets
  const validateParam = /[a-zA-Z]/.test(str);
  // Return error if contain another alphabets
  if (!validateParam) return 'String only contain alphabets';
  // Set param to lowercase
  const setToLowerCase = str.toLowerCase();
  // Split the caracter to array
  const splitCharacter = setToLowerCase.split('');
  // Initial is unique
  let isUnique = true;
  // Looping to find character index 0 with another index
  for (let i = 0; i < splitCharacter.length; i++) {
    // console.log(`character i ${splitCharacter[i]}`)
    const arrayCheckingUnique = [];
    for (let j = 0; j < splitCharacter.length; j++) {
      // Check the another index of i and j
      if (j !== i) {
        // console.log(`character i ${i} ${splitCharacter[i]} : character j ${j} ${splitCharacter[j]}`)
        // Check if character index i is equal with another character
        if (splitCharacter[i] === splitCharacter[j]) {
          arrayCheckingUnique.push(true);
        } else {
          arrayCheckingUnique.push(false);
        }
      }
    }
    // console.log(arrayCheckingUnique);
    // Check if character contain true, then set is unique to false and break the loop
    if (arrayCheckingUnique.includes(true)) {
      isUnique = false;
      break;
    }
  }
  return isUnique
}

console.log('Character abcdefg is unique?', hasUniqueCharacters('abcdefg'))
console.log('Character hello is unique?', hasUniqueCharacters("hello"));