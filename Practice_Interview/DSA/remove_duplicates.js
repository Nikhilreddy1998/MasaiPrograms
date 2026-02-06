function removeDuplicates(arr){
    let set = new Set()
    let j=0
    for(let i=0;i<arr.length;i++){
        if(!set.has(arr[i]))
        {
            set.add(arr[i])
            arr[j]=arr[i]
            j++
        }
    }
    return j-1
}
let arr=[1,2,2,3,4,4,4,5,5]
let temp=removeDuplicates(arr)
let st=[]
for(let i=0;i<=temp;i++){
    st.push(arr[i])
}
console.log(st)