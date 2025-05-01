import { useContext, useState} from 'react';
import './App.css';
import { DataProvider, ThemeContext } from './DataProvider';
import Child1 from './childs/child1';
import Child2 from './childs/child2';
import React from 'react';

function App() {
    const {theme,updateThemeValue}= useContext(ThemeContext)
    console.log("!!!",theme)
  
    return(
        <div>
            <button onClick={updateThemeValue}>Click Me!</button>
            <Child1/>
        </div>
        
    )


}

export default App;