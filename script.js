let key = "99226ac4f42f7c92e9feb899be502fe2"
let title = "avengers"

// selecting main elements
let posterContainer = document.getElementById("poster-container")
let movieDataContainer = document.getElementById("movie-data")

getMovieData(urlGenerator(title, key))

// generate new url
function urlGenerator(title, key){
    url = "https://api.themoviedb.org/3/search/movie?api_key="+key+"&query="+title
    return url
}

//  using the API response
async function getMovieData(urlFetch){
    posterContainer.innerHTML = ''
    fetch(urlFetch)
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < data.results.length; i++){
                if(data.results[i].poster_path != null){
                    setPoster(data.results[i].poster_path)
                }
            }
        })
        .catch(console.error())
}

//  getting poster
function setPoster(posterID){
    let posterURL = "https://image.tmdb.org/t/p/original"+posterID
    let poster = document.createElement('div')

    poster.style.backgroundImage = "url('"+posterURL+"')"
    posterContainer.appendChild(poster)
}

// generating new content based on search keyword
function search(){
    let searchTerm = document.getElementById('search').value
    getMovieData(urlGenerator(searchTerm, key))
}

document.addEventListener('keydown', (event) => {
    const keyname = event.key

    if(keyname == 'Enter'){
        search()
    }
})