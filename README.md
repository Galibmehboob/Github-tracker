1️⃣ What is the difference between var, let, and const?
---> "var" is function scoped and can be redeclared and updated. "let" is block-scoped, can be updated but not redeclared in the same scope. "const" is block-scoped and cannot be redeclared or reassigned, though objects/arrays inside it can be modified.

2️⃣ What is the spread operator (...)?
-->The spread operator (...) in JavaScript is used to expand an array or object into individual elements. It’s useful for copying, merging, or passing elements modifying the original, i can give an eample ->
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]-->here the spread operator works in arr1 and collect all array num.

3️⃣ What is the difference between map(), filter(), and forEach()?
--->forEach()- executes a function on each array element but does not return anything.
map()- executes a function on each element and returns a new array with the results.
filter()- executes a function and returns a new array with only elements that pass a condition.

4️⃣ What is an arrow function?
-->arrow function is a shorter syntax for writing functions in JavaScript using =>.Making it useful for callbacks.

5️⃣ What are template literals?
-->Template literals are strings in backticks (``) that allow embedded expressions using "${}" and multi line strings easily.
