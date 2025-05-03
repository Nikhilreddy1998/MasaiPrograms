
/*undersatand this
let data={loading:false,error:null,data:null}

let newdata={...data,loading:true}

console.log(newdata)//output:{ loading: true, error: null, data: null }

*/

/*
You are absolutely right! The name onClick inherently implies that the action should happen after the click. 
Your intuition is spot on.

The key is understanding when the code inside the curly braces {} of the onClick prop is evaluated by React.

When React renders the DataComponent, it goes through the JSX and sets up the properties of each element.
 When it encounters <button onClick={fetchData}>, it sees that the onClick prop should be associated with
  the fetchData function itself. It stores a reference to this function as the handler for the click event
   on that button.

However, if you write <button onClick={fetchData()}>, 
React still evaluates what's inside the curly braces during the rendering process.
 In this case, fetchData() is a function call, so React will:

Execute the fetchData() function immediately as it's rendering the component.

Take the return value of fetchData() and assign that as the onClick handler.

So, the fetchData function runs once, right when the component appears on the screen, 
not when the user clicks the button. The onClick handler is then set to whatever fetchData() 
returned (which might be undefined if it doesn't explicitly return anything).

Therefore, when the user actually clicks the button later, the code that runs is the return
 value of that initial fetchData() call, not fetchData itself. This is almost certainly 
 not the desired behavior for an action you want to trigger on a click.
*/
import React, { createContext,useState } from "react";

export const DataContext =createContext()

export function DataProvider({children}){
    const[state,setState]=useState({
        loading:false,
        error:null,
        data:null
    })
    async function fetchData(){
        setState({...state,loading:true})
        try{
            const response= await fetch("https://jsonplaceholder.typicode.com/posts")
            const result= await response.json()
            setState({...state,loading:false,data:result})
          }
          catch(error){
            setState({...state,error:error.message})
          }
    }
    return(
        <>
        <DataContext.Provider value={{state,fetchData}}>
            {children}
        </DataContext.Provider>
        </>
    )
}