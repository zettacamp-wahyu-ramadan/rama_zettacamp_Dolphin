/**
 * write a function that returns the majority element.
 * The majority element is the element that appears more than other element.
 * READ EXAMPLE BELOW!

console.log(majorityElement([3, 2, 3])); // Output: 3 
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2 

 * You may assume that the majority element always exists in the array.

 * Returns the majority element from the input array of integers.

 * @param {number[]} nums - The input array of integers.
 * @return {number} Returns the majority element.
 */
function majorityElement(nums) {
  // Distinct element from array/params
  const distinctNums = new Set(nums);

  // Set distinct to array
  const arrayDistinct = [...distinctNums];

  // Maping/looping from arrayDistinct
  const mapNums = arrayDistinct
    .map((valueMap) => {
      // Filtering value from valueMap in looping arrayDistinct and find the same with array nums/original
      const filteringNums = nums.filter(
        (valueFilter) => valueFilter === valueMap
      );
      return filteringNums;
    })
    .sort((a, b) => b.length - a.length); // Sorting descending

  // return map from array index 0 and get value inside array index 0 in value index 0
  return mapNums[0][0];
}

console.log(majorityElement([3, 2, 3])); // Output: 3 
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2
