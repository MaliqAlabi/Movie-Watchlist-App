let watchlistId = JSON.parse(localStorage.getItem("myWatchlist")) || []
const apikey = 'ced72a14'


window.addEventListener('load', render())

function render(){
     if (watchlistId.length > 0){
        renderWatchlist()
     } else{
         document.getElementById('content').innerHTML = `
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html">Let’s add some movies!</a>
         `
     }
}

function renderWatchlist(){
    let card = ''
    for(let tag of watchlistId){
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
                                        <img src='remove.png'/>
                                        <p data-remove="${moviesDisplay.imdbID}">Remove</p>  
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
                document.getElementById('content').innerHTML = `<div id='layout'>${card}</div>`
            })
        
    }
}

document.addEventListener('click', function(e){
    if(e.target.dataset.remove){
       handleRemoveClick(e.target.dataset.remove) 
    }
})

function handleRemoveClick(idOfMovie){
    if(watchlistId.includes(idOfMovie)) {
        watchlistId.splice(watchlistId.indexOf(`${idOfMovie}`), 1)
        localStorage.setItem("myWatchlist", JSON.stringify(watchlistId))
        render()
    }
}