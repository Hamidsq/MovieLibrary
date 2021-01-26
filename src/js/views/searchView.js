import { elements } from './base';

//getting input from user
export const getInput = () => elements.searchInput.value;

//clear search term
export const clearInput = () => {
    elements.searchInput.value = "";
}

//clearing search result
export const clearResult = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
    elements.homepage.innerHTML = '';
}

//clear search query
export const clearSearchQuery = () => {
    elements.movieSearched.innerHTML = '';

};


//display the search term 
export const searchQuery = search => {
    if (search.responseData === 'True') {
        const markUp = `<h1>search results for &ldquo;${search.query}&rdquo;</h1>`;
        elements.movieSearched.insertAdjacentHTML('beforeend', markUp);
    } else if (search.result.Response === 'False') {
        const markUp = ` <h1>No search results found for &ldquo;${search.query}&rdquo;</h1> `;
        elements.movieSearched.insertAdjacentHTML('beforeend', markUp);
    }
};

//render single movie 
export const renderMovie = movie => {
    const img = movie.Poster === 'N/A' ?
        `<div class="noImg small-size">
            <svg class="noImg__icon">
                <use xlink:href="img/sprite.svg#icon-sad"></use>
            </svg>
            <span class="noImg__text">image not available</span>
        </div>` : `<img src="${movie.Poster}" alt="${movie.Title}" class="movie__photo"></img>`;

    const markUp = `
    <a class="movie__result" href="#${movie.imdbID}" data-id=${movie.imdbID}>
                    ${img}
                    <div class="movie__details">
                        <h3 class="movie__name">${movie.Title}</h3>
                    </div>

    </a>`;
    elements.searchResList.insertAdjacentHTML('beforeend', markUp);
}

const createButton = (page, type) => `<a href="#" class="pagination__${type} btn__page" data-goto=${type=== 'previous'? page -1 : page +1}>
 page ${type === 'previous'? page - 1 : page +1} ${type === 'previous' ? '&laquo;' :'&raquo;' }</a>`;


const renderButton = (page, numResults, resPerPage) => {
    //number of pages we have
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (pages === 1) {
        elements.searchResPages.style.display = 'none';
    } else if (page === 1 && pages > 1) {
        //only one button to go to next page
        button = createButton(page, 'next')

    } else if (page < pages) {
        //button to go to prev and next page
        button = `
                    ${createButton(page,'previous')}
                    ${createButton(page,'next')}
            `
    } else if (page === pages && pages > 1) {
        //only button to go to prev page
        button = createButton(page, 'previous')
    }
    elements.searchResPages.insertAdjacentHTML('beforeend', button);

}

//loop through movie array and call renderMovie method on each movie 
//display 10 movies per page
export const renderResults = (movies, page = 1, resPerPage = 12) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    movies.slice(start, end).forEach(renderMovie);


    renderButton(page, movies.length, resPerPage);

}