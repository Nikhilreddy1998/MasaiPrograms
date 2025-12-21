//-------------------------------Parameterized recursion---------------------
// function summation(i, sum){
//     if(i>5){
//         console.log(sum);
//         return;
//     }
//     return summation(i+1, sum+i);
// }
// summation(1, 0);


//----------------------------------Functional Recursion---------------------------
//------------------------summation of n numbers----------------------------------
// function summation(n){
//     if(n==0){
//         return 0;
//     }
//     return n+summation(n-1); 
// }
// console.log(summation(5));

//------------------------factorial of n----------------------------------
// function fact(n){
//     if(n==0){
//         return 1;
//     }
//     return n*fact(n-1);
// }
// console.log(fact(5));


//------------------------------Reverse using two pointers------------------------
// function reverse(l, r, arr){
//     if(l>=r) return arr;
//     [arr[l], arr[r]]= [arr[r], arr[l]];//swap
//     return reverse(l+1, r-1, arr);
// }

// let arr=[1, 2, 3, 4, 2], n=arr.length;
// console.log(reverse(0, n-1, arr));


//------------------------------------Reverse using single pointer------------------
// function reverse(i, n, arr){
//     if(i>=Math.floor(n/2)) return arr;
//     [arr[i], arr[n-i-1]]= [arr[n-i-1], arr[i]];
//     return reverse(i+1, n, arr);
// }

// let arr=[1, 2, 3, 4, 2], n=arr.length;
// console.log(reverse(0, n, arr));

//-----------------------------Check if string is palindrome or not----------------
// function palindrome(i, n, str){
//     if(i>=Math.floor(n/2)) return true;
//     if(str[i]!==str[n-i-1]) return false;
//     return palindrome(i+1, n, str);
// }

// let str="madam", n=str.length;
// console.log(palindrome(0, n, str));


//-------------------------------Multiple Recursion Calls-------------------
//----------------------------------fibonacci number-----------------------
// function fibo(n){
//     if(n<=1) return n;
//     return fibo(n-1)+fibo(n-2);
// }

// console.log(fibo(4));//0 1 1 2 3 

//----------------------------Recursion on subsequences-----------------------
// function subsequence(i, sub, arr, n){
//     if(i>=n){
//         console.log(sub);
//         return;
//     }
//     //pick the particular index's element into the subsequence
//     sub.push(arr[i]);
//     subsequence(i+1, sub, arr, n);
//     //After the previous line comes back, pop that element out, i.e., not pick the particular index's element into the subsequence, and then again call the function
//     sub.pop();
//     subsequence(i+1, sub, arr, n);
// }

// let arr=[3, 1, 2], n=arr.length; 
// subsequence(0, [], arr, n);

//--------------------------------Print all subsequences whose sum equals to K-------------------------
// function sumEqualtoK(i, sub, arr, n, sum, K) {
//     if (i >= n) {
//         if (sum == K) {
//             console.log(sub);
//         }
//         return;
//     }
//     //pick the particular index's element into the subsequence
//     sub.push(arr[i]);
//     sum += arr[i];
//     sumEqualtoK(i + 1, sub, arr, n, sum, K);
//     //After the previous line comes back, pop that element out, i.e., not pick the particular index's element into the subsequence, and then again call the function
//     sub.pop();
//     sum -= arr[i];
//     sumEqualtoK(i + 1, sub, arr, n, sum, K);
// }

// let arr = [1, 2, 1], n = arr.length, K = 2, sum = 0;
// sumEqualtoK(0, [], arr, n, sum, K);

//--------------------------------Print any 1 subsequence whose sum equals to K-------------------------
// function sumEqualtoK(i, sub, arr, n, sum, K) {
//     if (i >= n) {
//         if (sum == K) {
//             console.log(sub);
//             return true;// returning true to keep track of finding the subsequence whose sum equals to K
//         }
//         else {
//             return false;//else returning false
//         }
//     }  
//     sub.push(arr[i]);
//     sum += arr[i];
//     if (sumEqualtoK(i + 1, sub, arr, n, sum, K) == true) return true;//calling the function in if statement to check if subsequence is found or not, if found then we will get true, and then simply return from here, and not do any further function calls
//     sub.pop();
//     sum -= arr[i];
//     if (sumEqualtoK(i + 1, sub, arr, n, sum, K) == true) return true;
//     return false;
// }

// let arr = [1, 2, 1], n = arr.length, K = 2, sum = 0;
// sumEqualtoK(0, [], arr, n, sum, K);


//--------------------------------Count the subsequences with sum equals to K-------------------------
function sumEqualtoK(i, arr, n, sum, K) {
    if (i >= n) {
        if (sum == K) return 1;// returning 1 to to keep track of the count of subsequences whose sum equals to K
        else return 0;//else returning 0
    }
    sum += arr[i];
    let left = sumEqualtoK(i + 1, arr, n, sum, K);//calling the function in if statement to check if subsequence is found or not, if found then we will get true, and then simply return from here, and not do any further function calls
    sum -= arr[i];
    let right = sumEqualtoK(i + 1, arr, n, sum, K);
    return left + right;
}

let arr = [1, 2, 1], n = arr.length, K = 2, sum = 0;
console.log(sumEqualtoK(0, arr, n, sum, K));