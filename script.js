const apiKey = "99226ac4f42f7c92e9feb899be502fe2"
const discoverUrl = "https://api.themoviedb.org/3/discover/movie?api_key="+apiKey+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"

let keyword = "avengers"
let vidsrc = "JfVOs4VSpmA"
let id
let videoList = []

// selecting main elements
let discoverContainer = document.getElementById("discover-container")
let posterContainer = document.getElementById("poster-container")
let videoContainer = document.getElementById("video-container")

getMovieData(discoverUrl, discoverContainer)
getMovieData(urlGeneratorKeyword(keyword, apiKey), posterContainer)

// generate new url
function urlGeneratorKeyword(keyword, apiKey){
    url = "https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&query="+keyword
    return url
}

function urlGeneratorMovieId(id, apiKey){
    url = "https://api.themoviedb.org/3/movie/"+id+"?api_key="+apiKey+"&language=en-US"
    return url
}
function urlGeneratorVideos(id, apiKey){
    url = "https://api.themoviedb.org/3/movie/"+id+"/videos?api_key="+apiKey+"&language=en-US"
    return url
}

//  using the API response
async function getMovieData(urlFetch, container){
    if(container == null){
        return
    }
    
    container.innerHTML = ''
    await fetch(urlFetch)
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < data.results.length; i++){
                if(data.results[i].poster_path != null){
                    setPoster(data.results[i].poster_path, data.results[i].id, container)
                }
            }
        })
        .catch(console.error())
}

async function generateOverlay(urlFetch){
    let detailsContainer = document.getElementById("details")
    let summaryContainer = document.getElementById("summary")

    await fetch(urlFetch)
        .then(response => response.json())
        .then(data => {
            setDetails(
                data.poster_path, 
                data.original_title, 
                data.vote_average, 
                data.release_date, 
                detailsContainer
            )
            setSummary(data.overview, summaryContainer)
        })
        .catch(console.error())

    getVideos(urlGeneratorVideos(id, apiKey))
}

async function getVideos(urlFetch){
    videoContainer.innerHTML = ''
    fetch(urlFetch)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for(let i = 0; i < data.results.length; i++){
                videoList.push(data.results.key)
            }
        })
        .catch(console.error())
        console.log(videoList)
}

//  getting poster
function setPoster(posterID, movieID, parent){
    let posterURL = "https://image.tmdb.org/t/p/original"+posterID
    let poster = document.createElement('div')

    poster.style.backgroundImage = "url('"+posterURL+"')"
    poster.value = movieID
    parent.appendChild(poster)
}

function setDetails(poster, title, rating, release, container){
    elements = container.children
    elements[0].src = "https://image.tmdb.org/t/p/original"+poster
    elements[0].style.width = "150px"
    elements[1].innerHTML = title
    elements[2].innerHTML = release
    elements[3].innerHTML = rating + '&nbsp;<i class="fa-solid fa-star"></i>'
}

function setSummary(summary, container){
    elements = container.children
    elements[1].innerHTML = summary
}

function setVideos(key, container){
    container.innerHTML += `
    <iframe src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
}

// generating new content based on search keyword
function search(){
    let searchTerm = document.getElementById('search').value
    getMovieData(urlGeneratorKeyword(searchTerm, apiKey), posterContainer)
}

document.addEventListener('keydown', (event) => {
    const keyname = event.key

    if(keyname == 'Enter'){
        search()
    }
})

document.addEventListener('click', (event) => {
    if(event.target.id == "close-btn"){
        document.getElementsByClassName('overlay')[0].classList.add('hide')
    }else if(event.target.id != "search"){
        if(event.target.value != null){
            id = event.target.value
            console.log(id)
            generateOverlay(urlGeneratorMovieId(id, apiKey))
            document.getElementsByClassName('overlay')[0].classList.remove('hide')
        }
    }
})