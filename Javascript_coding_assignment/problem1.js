/*JavaScript Coding Assessment*

*Time: 2 Hours*  								 *Maximum Marks: 100*

---

### *Instructions:*

1. Answer all questions.
2. Each question carries equal marks.
3. Use appropriate syntax and best practices.
4. Code should be efficient and well-structured.
5. Error handling should be considered where applicable.

---

## *Section A: Array Methods (30 Marks)*

### **Q1. Implement a custom ****.map()**** function** (10 Marks)

Write a function myMap(arr, callback) that mimics the behavior of .map() without using .map().

js
*/
function myMap(arr, callback) {
   let narr=[]
   for(let i=0;i<arr.length;i++)
   {
      narr[i]=callback(arr[i])

   }
   return narr

}
console.log(myMap([1, 2, 3], num => num * 2)); // [2, 4, 6]


