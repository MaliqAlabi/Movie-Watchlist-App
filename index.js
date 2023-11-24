const formEl = document.getElementById('form')
const formInput = document.getElementById('form-input')
const contentEl = document.getElementById('content')
const apikey = 'ced72a14'
let watchlistTag = JSON.parse(localStorage.getItem("myWatchlist")) || []
let uniqueTag =[]


formEl.addEventListener('submit',function(){
    event.preventDefault()
    search()
})

document.addEventListener('click',function(e){
    if(e.target.dataset.add){
        watchlistMovies(e.target.dataset.add)
    }
})

function watchlistMovies(movieId){
    // let watchlistMoviesTag = uniqueTag.filter(function(tags){
    //     return movieId === tags
    // })[0]
    
    if(!watchlistTag.includes(movieId)){
        watchlistTag.push(movieId)
    }
    localStorage.setItem("myWatchlist",JSON.stringify(watchlistTag))
    
}


function search(){
    fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${formInput.value}`)
        .then(res => res.json())
        .then(data => {
            if(data.Search){
                uniqueTag = data.Search.map(movie => movie.imdbID)
                render(uniqueTag)
            }else{
                contentEl.innerHTML = `<p id='error'>Unable to find what you’re looking for. Please try another search.</p>`
            }
        })
}


function render(id){
    let card = ''
    for(let tag of id){
        fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${tag}`)
            .then(res => res.json())
            .then(data => {
                for(moviesDisplay of [data]){
                    card += 
                        `<div id='card-container'>
                            <img src=${moviesDisplay.Poster}>
                            <div id='card-text'>
                                <div id='card-top'>
                                    <h3>${moviesDisplay.Title}</h3>
                                    <div id='card-top-rating'>
                                        <img src='star.png'/>
                                        <p>${moviesDisplay.imdbRating}</p>  
                                    </div>
                                </div>
                                <div id='card-middle'>
                                    <p>${moviesDisplay.Runtime}</p>
                                    <p>${moviesDisplay.Genre}</p>
                                    <div id='card-middle-watchlist'>
                                        <img src='add.png'/>
                                        <p data-add="${moviesDisplay.imdbID}">watchlist</p>  
                                    </div>
                                </div>
                                <div id='card-bottom'>
                                    <p>${moviesDisplay.Plot}</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        `
                }
                contentEl.innerHTML = `<div id='layout'>${card}</div>`
            })
        
    }
    
    
}
