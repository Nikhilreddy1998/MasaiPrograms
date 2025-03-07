function stoneage(n,arr){
    i=0
    j=n-1
    sumx+=arr[i]
    sumy+=arr[j]
    maxi=-Infinity
    while(i<j){
 
        if(sumx==sumy && sumx>maxi){
            maxi=sumx
            
            i++
            j--
            
        }
        else if(sumx>sumy) {
            j=j-1
            sumy+=arr[j]
        }
        else
        {
            i=i+1
            sumx+=arr[i]
        }
    }

}