var st=[]
var minElement=0

function push(x){
    if(st.length==0)
    {
        st.push(x)
        minElement=x
    }
    else
    {
        if(x>=minElement)
        {
            st.push(x)
        }
        else
        {
            st.push(2*x-minElement)
            minElement=x
        }
    }
}
function pop(){
    if(st.length==0)
    {
        console.log("underflow")
    }
    else
    {
        if(st[st.length-1]>=minElement)
        {
            st.pop()
        }
        else
        {
            minElement=2*minElement-st[st.length-1]
            st.pop()
        }
    }

}
function getmin()
{
    console.log(minElement)
}
push(3)
push(5)
push(2)
push(7)
push(8)
pop()
getmin()