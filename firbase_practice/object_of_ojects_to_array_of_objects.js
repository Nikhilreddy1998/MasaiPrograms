let obj={
    "movies": {
    "m1": {
    "title": "Inception",
    "year": 2010,
    "genre": "Sci-Fi",
    "image": "https://example.com/inception.jpg"
    },
    "m2": {
    "title": "Titanic",
    "year": 1997,
    "genre": "Romance",
    "image": "https://example.com/titanic.jpg"
    }
    }
 }
 //console.log(movies)//object of objects
 //actually we get data of /movies.json
 let movies=obj.movies//we get like this data we we fetch from firebase json data
 let moviesArray=Object.entries(movies)
 //console.log(moviesArray)//Array of Arrays
 let finaldata=moviesArray.map(([id,movies])=>({id,...movies}))
 console.log(finaldata)//Array of objects
