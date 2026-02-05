//client side---fetch--serverside
//fetch--promise based call
//fetch(url)-->promose--resolved(get some data)/pending()wait/rejected(404 error)
//fetch makes HTTP requests to the server and returns a promise resolving to the response

let myFetch=fetch('https://fakestoreapi.com/products')
myFetch
.then((res)=>{
    return res.json()
})
.then((res)=>{
    console.log(res)
})