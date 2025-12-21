// Given an array of integers nums and an integer k,
// return the k most frequent elements.You can return
// the answer in any order 






let nums=[4,4,4,4,1,1,1,2,2,2,3] 
let k=2 

solve(nums,k)

function solve(nums,k){
  let obj={}
  for(let i=0;i<nums.length;i++){
    if(obj[nums[i]]){
      obj[nums[i]]++
    }
    else
    {
      obj[nums[i]]=1
    }
  }
  let sorted=Object.entries(obj).sort((a,b)=>b[1]-a[1])
  console.log(sorted)
  let count=0
  let arr=[]
  for(let i=0;i<sorted.length;i++)
  {
    
    if(count<k){
      arr.push(sorted[i][0])
      count++      
    }
  }
  arr=arr.map(Number)
  console.log(arr)
  
}