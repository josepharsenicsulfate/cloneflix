let apiKey = "99226ac4f42f7c92e9feb899be502fe2"
let keyword = "avengers"
let discoverUrl = "https://api.themoviedb.org/3/discover/movie?api_key="+apiKey+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"

// selecting main elements
let discoverContainer = document.getElementById("discover-container")
let posterContainer = document.getElementById("poster-container")
let movieDataContainer = document.getElementById("movie-data")
let vidsrc = "JfVOs4VSpmA"

getMovieData(discoverUrl, discoverContainer)
getMovieData(urlGenerator(keyword, apiKey), posterContainer)
getMovieVideos(vidsrc)

// generate new url
function urlGenerator(keyword, apiKey){
    url = "https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&query="+keyword
    return url
}

//  using the API response
async function getMovieData(urlFetch, container){
    container.innerHTML = ''
    fetch(urlFetch)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for(let i = 0; i < data.results.length; i++){
                if(data.results[i].poster_path != null){
                    setPoster(data.results[i].poster_path, data.results[i].id, container)
                }
            }
        })
        .catch(console.error())
}

function getMovieVideos(vidsrc){
    let vidplayer = document.createElement("iframe")
    vidplayer.style.width = "100%"
    vidplayer.style.height = "auto"
    vidplayer.src = "https://www.youtube.com/embed/"+vidsrc
    movieDataContainer.appendChild(vidplayer)
}

//  getting poster
function setPoster(posterID, movieID, parent){
    let posterURL = "https://image.tmdb.org/t/p/original"+posterID
    let poster = document.createElement('div')

    poster.style.backgroundImage = "url('"+posterURL+"')"
    poster.value = movieID
    parent.appendChild(poster)
}

// generating new content based on search keyword
function search(){
    let searchTerm = document.getElementById('search').value
    getMovieData(urlGenerator(searchTerm, apiKey), posterContainer)
}

document.addEventListener('keydown', (event) => {
    const keyname = event.key

    if(keyname == 'Enter'){
        search()
    }
})

document.addEventListener('click', (event) =>{
    console.log(event.target.value)
})