import React, { createContext, useState } from "react";
import Child1 from "./childs/child1";
import Child2 from "./childs/child2";
import App from "./App";


export const  ThemeContext=createContext()


export function DataProvider({children}){
    const[theme,setTheme]=useState("light")

    const updateThemeValue= () => {
        if(theme=="light"){
            setTheme("dark")
        }
        else{
            setTheme("light")
        }

    }


    return (
        <ThemeContext.Provider value={{theme,updateThemeValue}}>

        {children}
            
            
        </ThemeContext.Provider>
    )
}