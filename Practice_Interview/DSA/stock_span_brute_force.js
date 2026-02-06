function stockSpan(arr){
 let n=arr.length
 let span=new Array(n).fill(1)
 for(let i=0;i<n;i++){
    let count=1
    for(let j=i-1;j>=0;j--){
        if(arr[j]<=arr[i])
            count++
    }
    span[i]=count
 }
 console.log(span)
}
let arr=[100,80,60,70,60,75,85]
stockSpan(arr)