// Task 1
let myFirstBook = "Laskar Pelangi";
const mySecondBook = "Backpacker";

// Override first book
myFirstBook = "Hati Baja";
// mySecondBook = "Kekekeke";

console.log("Task 1");
console.log("My first book:", myFirstBook);
console.log("My second book:", mySecondBook);
console.log("");

// Task 2
// const concatingVariable = myFirstBook + " " + mySecondBook + " " + isRead;
let concatingVariable = `My favourite book is ${myFirstBook} and ${mySecondBook}`; // Template literals string

console.log("Task 2");
console.log(concatingVariable);
console.log("");

// For note
let isRead = true;
concatingVariable = `Am I finish to read book ${myFirstBook}? ${isRead}`

console.log("For Note");
console.log(concatingVariable);
console.log("");

isRead = false;
concatingVariable = `Am I finish to read book ${mySecondBook}? ${isRead}`

console.log("For Note");
console.log(concatingVariable);
console.log("");
