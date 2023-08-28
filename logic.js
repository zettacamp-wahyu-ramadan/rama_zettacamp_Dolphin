/**
 *
 * Write a Node.js function isPrime(n) that takes an integer n as an argument and returns true if n is a prime number and false otherwise.
 *
 */
function isPrime(n) {
  // Your logic here
  if (n <= 1) return 'Please insert number more than 1';

  // Prime number holder
  const prime = [];

  for (let i = 2; i <= n; i++) {
    const arrayCheckinPrime = [];
    for (let j = 2; j <= i; j++) {
      // Check another divided the number itself
      if (j !== i) {
        // if there is a number that is divisible when divided other than the number itself return false and return true otherwise
        if (i % j === 0) {
          arrayCheckinPrime.push(false);
        } else {
          arrayCheckinPrime.push(true);
        }
      }
    }
    // Check if inside arrayCheckinPrime not contain false
    if (!arrayCheckinPrime.includes(false)) {
      prime.push(i);
    }
  }

  // Check if array in prime variable contain number from parameter
  if (prime.includes(n)) return true;

  // return default false
  return false;
}

console.log(isPrime(10));
console.log(isPrime(43));
