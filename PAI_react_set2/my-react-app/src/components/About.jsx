import React from "react"

function About(){
    return(
        <>
        <div style={{background:"white"}}>
        <h1>About the exercise</h1>
        <h2>Routing</h2>
        <p>BrowserRouter is wrapped over the main app,Routes are used to wrap individual Route,Route provides
            the path and functional component to be loaded on UI </p>
        <p>Here link tag is used that is from react-router-dom which is optimised anchor tag.</p>
        <h2>useState,useEffect</h2>
        <p>useState is a hook that stores some memory of virtual dom during rendering and rerendering only the virtual
            dom gets updated instead of not making entire changes in DOM tree
        </p>
        <p>useEffect is used to avoid side effects such as fetching data before UI loads. when the dependency array 
            is empty then the useEffect mounts only once. Here in this example after UI is loaded we are fetching 
            data only once with the help of useEffect
        </p>
        <h2>Context API</h2>
        <p>Context API is used instead of propdrilling. Here a global context is created at the global level then it is provided 
            to the different functional components by using contextprovider.so those functional components can useContext which is 
            globally available
        </p>
        <h2>useParams</h2>
        <p>useParams usually destructure the url .</p>
        </div>
        </>
    )
}

export default About