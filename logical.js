/**
 *
 * Write a function max_of_two(a, b) that takes in two integers, a and b, and returns the maximum of the two numbers without using any arrays or built-in functions like max().
 *
 */
function max_of_two(a, b) {
  // Using if else
  // if (a >= b) {
  //   return a;
  // } else {
  //   return b;
  // }

  // Using ternary
  return a >= b ? a : b;
}

console.log(max_of_two(10, 5));
console.log(max_of_two(45, 66));