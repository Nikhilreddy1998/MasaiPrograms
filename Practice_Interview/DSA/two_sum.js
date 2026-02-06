let k=18
let arr=[1,3,16,17]
console.log(twoSum(arr))
function twoSum(arr){
    arr.sort((a,b)=>a-b)
    let i=0
    let j=arr.length-1
    while(i<j)
    {
        if(arr[i]+arr[j]==k)
            return true
        else if(arr[i]+arr[j]<k)
            i++
        else
            j--
            
    }
    return false
}