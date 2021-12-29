// API TMDB

const api_key = 'api_key=9c3efaa109b52d811bee148bb2ed27f5';
const base_url = 'https://api.themoviedb.org/3';
const popular_movie_url = `${base_url}/discover/movie?sort_by=popularity.desc&${api_key}`;
const img_url ='https://image.tmdb.org/t/p/w500';
const search_url = `${base_url}/search/movie?${api_key}`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// console.log(popular_movie_url);

getMovies(popular_movie_url);

function getMovies(url){
    fetch(url).then(res=>res.json()).then(data => {
        // console.log(data); //mengambil data json tmdb 
        // console.log(data.results); //mengambil data dari object yaitu results
        showMovies(data.results);
    })
}

function showMovies(data){
    main.innerHTML= '';

    data.forEach(movie => {
        const {title, vote_average, overview, poster_path} = movie;
        // console.log(title);

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        // console.log(movieEl);
        movieEl.innerHTML = `
            <img src="${img_url}${poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        main.append(movieEl);
    });

}

function getColor(vote){
    if(vote>=8){
        return 'green';
    } else if (vote>=5){
        return 'orange';
    } else {
        return 'red';
    }
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(`${search_url}&query=${searchTerm}`);
    } else {
        getMovies(popular_movie_url);
    }
})