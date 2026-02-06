// container with most water

function maxArea(nums){
    let i=0
    let j=nums.length-1
    let res=-Infinity
    while(i<j){
        let water=(j-i)*Math.min(nums[i],nums[j])
        res=Math.max(water,res)
        if(nums[i]<nums[j]){
          i++
        }
        else
        {
            j--
        }
    }
    console.log(res)
}
maxArea([1,8,6,2,5,4,8,3,7])