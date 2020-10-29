import { elements } from "./base";

export const clearMovie = () => {
    elements.singleMovie.innerHTML = '';
}

export const goBack = () => {
    window.history.back();
}
export const renderMovie = movie => {
    const markUp = ` <div class="single__movie__poster">
    <img class="single__img" src="${movie.poster}" alt="${movie.Title}">

</div>

<div class="single__movie__details" href="#${movie.imdbID}" >

    <div class="single__movie__info">
        <div class="single__movie__info-name">
            <h1 class="movie-name">${movie.title}</h1>
        </div>
        <div class="single__movie__info-release">
            <h1 class="release-date">&#40;${movie.year}&#41;</h1>
        </div>
    </div>

    <div class="single__movie__details-icons">

        <div class="icon-box">

            <svg class="movie-duration">
                <use xlink:href="img/sprite.svg#icon-clock"></use> 
               
            </svg>

        </div>
        <h3 class="movie-timing">${movie.runTime}</h3>

        <div class="icon-box">
            <svg class="movie-rating">
                <use xlink:href="img/sprite.svg#icon-star-half"></use>
             </svg>

        </div>
        <h3 class="movie-rating">${movie.imdbRating}</h3>

    </div>
    <div class="single__movie__details-overview">
        <h2 class="overview-heading">Overview</h2>
        <p class="movie-summary">${movie.plot}</p>
    </div>

    <div class="single__movie__details-director">

        <div class="movie-director">
            <svg class="icon-director">
                <use xlink:href="img/sprite.svg#icon-user"></use>
                
            </svg>
        </div>


        <h3 class="director-name">${movie.director}</h3>

    </div>
    <h3 class="director-heading">Director</h3>




    <div class="buttons">
        <div class="buttons__link">
            <button class="buttons__link-btn">${movie.imdbRating}</button>
        </div>

        <div class="buttons__nav">
            <button class="buttons__nav__like">
                    click to like
                    <svg class="buttons__nav__icon">
                        <use xlink:href="img/sprite.svg#icon-heart"></use>
                    </svg>
                </button>
            <button class="buttons__nav__watch">
                    <svg class="buttons__nav__icon">
                        <use xlink:href="img/sprite.svg#icon-plus"></use>
                    </svg>
                    add to watch list

                </button>
        </div>

    </div>

    <div class="btn">
        <button class="btn__back">
                <svg class="btn__icon">
                    <use xlink:href="img/sprite.svg#icon-arrow-left2"></use>
                </svg>
                Back
            </button>

    </div>

</div>  
    
    `;
    //elements.searchResList.innerHTML = "";
    elements.singleMovie.insertAdjacentHTML('afterbegin', markUp);

}