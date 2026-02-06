function maxSum(arr,n,k){
let sum=0
for(let i=0;i<k;i++){
    sum+=arr[i]
}
let temp=sum
for(let i=k;i<n;i++){
    sum+=arr[i]-arr[k-i]
    if(sum>temp){
        temp = sum
    }
}
console.log(temp)
}
let arr=[1,4,2,10,23,3,1,0,20]
let n=9
let k=4
maxSum(arr,n,k)