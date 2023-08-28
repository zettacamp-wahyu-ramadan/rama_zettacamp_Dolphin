/**
 * write a function that returns true if there's duplicate in the array, and false otherwise.
 * SEE EXAMPLE BELLOW!
 * 
 * 
Example
console.log(containsDuplicate([1, 2, 3, 1])); // Output: true
console.log(containsDuplicate([1, 2, 3, 4])); // Output: false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // Output: true

 * Determines if the array contains any duplicate value.

 * @param {number[]} nums - The input array of integers.
 * @return {boolean} Returns true if the array contains any duplicate value, false otherwise.
 */
function containDuplicate(nums) {
  // Your logic here
  let result = false;

  // Loop 1 for where index to check
  for (let i = 0; i < nums.length; i++) {
    // Looping 2 for check value by index I with another value in another index
    for (let j = 0; j < nums.length; j++) {
      // Check value in another index by own
      if (i !== j) {
        // console.log(`var I ${i} : var J ${j}`);
        // Check if value index I have same value in another index then set result to true and break looping
        if (nums[i] === nums[j]) {
          result = true;
          break;
        }
      }
    }
  }

  return result;
}

console.log(containDuplicate([1, 2, 3, 1])); // Output: true
console.log(containDuplicate([1, 2, 3, 4])); // Output: false
console.log(containDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // Output: true