let n1=[2,4,5,7,9]
let n2=[1,3,6,8,9]
let r=[]
let i=0
let j=0
let k=0
while(i<n1.length&&j<n2.length){
    if(n1[i]<n2[j]){
      r[k]=n1[i]
      i++
      k++
    }
    else
    {
        r[k]=n2[j]
        j++
        k++
    }
}
while(i<n1.length){
    r[k]=n1[i]
    i++
    k++
}
while(j<n2.length){
    r[k]=n2[j]
    j++
    k++
}
console.log(r)