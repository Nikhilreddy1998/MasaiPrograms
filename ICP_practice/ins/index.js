// url1=https://jsonplaceholder.typicode.com/albums
//url2=https://jsonplaceholder.typicode.com/photos

//1.fetching both data sets

async function fetchData1(){
    try{
        let response = await fetch('https://jsonplaceholder.typicode.com/albums')
        let data= await response.json()
        console.log("data",data)

        let userid3pics=data.filter(h=>h.userId===3).map(h=>h.title)

        userid3pics.forEach((n)=>console.log("title",$`{n}`))

        let userid7pics=data.filter(h=>h.userId===7).map(h=>h.title)

        userid7pics.forEach((n)=>console.log("title",$`{n}`))

        

    }catch(err){
        console.log('err',err)
    }
}
fetchData1()


async function fetchData2(){
    try{
        let response = await fetch('https://jsonplaceholder.typicode.com/photos')
        let data= await response.json()
        console.log("data",data)

        let totalPhotos=data.length
        console.log("Total photos",totalPhotos)

    }catch(err){
        console.log('err',err)
    }
}
fetchData2()
