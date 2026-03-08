1.⁠ ⁠Differences among var, let, const

var is an old JavaScript variable declaration keyword. It is function-scoped and can be redeclared again in the same scope. It also has a known behavior called hoisting, which sometimes causes bugs.

let is a block-scoped variable declaration keyword. If a variable needs to be reassigned later, let is a good choice in modern JavaScript.

const is also a block-scoped variable declaration keyword. But its value cannot be changed later after it is assigned.


2.⁠ ⁠Spread Operator (...)

The spread operator (...) is used to spread or expand the elements of an array or object.

Example:

const array = [1,2,3,4];
const array2 = [...array];

Here the elements of array are spread into array2.


3.⁠ ⁠Difference among map(), filter(), forEach()

Using map(), we can access all elements of an array and modify them (for example by adding, multiplying, or performing other operations). It returns a new array.

filter() takes a condition and checks whether each element satisfies the condition. In the end, it returns a new array containing only the elements that fulfill the condition.

forEach() only loops through each element of the array, but it does not return a new array.

Example:

const nums = [1,2,3,4];

const doubled = nums.map(n => n*2);
const evens = nums.filter(n => n%2===0);
nums.forEach(n => console.log(n));



4.⁠ ⁠Arrow Function

Unlike normal functions, arrow functions do not need the function keyword. They are shorter in syntax and make the code cleaner.

Arrow functions can be stored in variables using let or const.

Example:

const add = (a,b) => a + b;
const square = x => x * x;



5.⁠ ⁠Template Literals

Using template literals with backticks ( ) we can write strings and include variables or expressions inside them.

Example:

const name = "Riyad";
console.log(⁠ Hello ${name} ⁠);

