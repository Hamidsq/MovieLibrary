import { elements } from "./base";


export const renderMovie = (movie, isLiked, isWatch, fromNavbar) => {
        let markUp;
        let img;
        if (movie.poster === 'N/A') {
            img = `<div class="noImg big-size" >
            <svg class="noImg__icon">
                <use xlink:href="img/sprite.svg#icon-sad"></use>
            </svg>
            <span class="noImg__text">image not available</span>
        </div>`;

        } else {
            img = `<img class="single__img" src="${movie.poster}" alt="${movie.Title}">`;
        }

        markUp = ` <div class="single__movie">
    
    <div class="single__movie__poster">${img}</div>

<div class="single__movie__details" href="#${movie.imdbID === 'N/A' ? 'Unavailable' : movie.imdbID}" >

    <div class="single__movie__info">
        <div class="single__movie__info-name">
            <h1 class="movie-name">${movie.title === 'N/A' ? 'Unavailable' : movie.title}</h1>
        </div>
        <div class="single__movie__info-release">
            <h1 class="release-date">&#40;${movie.year === 'N/A' ? 'Unavailable' : movie.year}&#41;</h1>
        </div>
    </div>

    <div class="single__movie__details-icons">

        <div class="icon-box">

            <svg class="movie-duration">
                <use xlink:href="img/sprite.svg#icon-clock"></use> 
               
            </svg>

        </div>
        <h3 class="movie-timing">${movie.runTime === 'N/A' ? 'Unavailable' : movie.runTime}</h3>

        <div class="icon-box">
            <svg class="movie-rating">
                <use xlink:href="img/sprite.svg#icon-star-half"></use>
             </svg>

        </div>
        <h3 class="movie-rating">${movie.imdbRating === 'N/A' ? 'Unavailable' : movie.imdbRating}</h3>

    </div>
    <div class="single__movie__details-overview">
        <h2 class="overview-heading">Overview</h2>
        <p class="movie-summary">${movie.plot === 'N/A' ? 'Unavailable' : movie.plot}</p>
    </div>

    <div class="single__movie__details-director">

        <div class="movie-director">
            <svg class="icon-director">
                <use xlink:href="img/sprite.svg#icon-user"></use>
                
            </svg>
        </div>


        <h3 class="director-name">${movie.director === 'N/A' ? 'Unavailable' : movie.director}</h3>

    </div>
    <h3 class="director-heading">Director</h3>




    <div class="buttons">
        <div class="buttons__link">
            <button class="buttons__link-btn">
            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="imdbScore">
            <span>IMDB ${movie.imdbRating === 'N/A' ? 'Unavailable' : movie.imdbRating} </span></a>
            </button>
        </div>

        <div class="buttons__nav">
            <button class="buttons__nav__like">
                    click to like
                    <svg class="buttons__nav__icon">
                        <use xlink:href="img/sprite.svg#${isLiked ? 'icon-heart' : 'icon-heart-o'}"></use>
                    </svg>
                </button>
            <button class="buttons__nav__watch">
                    <svg class="buttons__nav__icon">
                        <use xlink:href="img/sprite.svg#${isWatch ? 'icon-bookmark' : 'icon-bookmark-o'}"></use>
                    </svg>
                    add to watch list

                </button>
        </div>

    </div>
    ${fromNavbar === true ? '' :
   ` <div class="btn">
        <button class="btn__back">
        &#x02190; Back
            </button>

    </div>`}

</div>  
    </div>
    `;
    elements.searchResList.innerHTML = markUp;
    elements.searchResPages.innerHTML = '';
    elements.movieSearched.innerHTML='';

}