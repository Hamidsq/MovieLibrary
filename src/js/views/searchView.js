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
}

//display the search term

export const searchQuery = search => {

    console.log('search JSON is ->', JSON.stringify(search, null, 2));
    console.log('typeof search is ->', typeof search);

    if (search.result.Response === 'True') {
        const markUp = `
            <div class="movie__searched">
                <h1>search results for &ldquo;${search.query}&rdquo;</h1>
            </div>
            `;

        elements.searchResList.insertAdjacentHTML('afterbegin', markUp);

    } else {

        const markUp = `
             <div class="movie__searched">
                 <h1>No search results for &ldquo;${search.query}&rdquo;</h1>
             </div>
             `;

        elements.searchResList.insertAdjacentHTML('afterbegin', markUp);
    }
}



//render single movie 
export const renderMovie = movie => {

    const img = movie.Poster === 'N/A' ?
        `<div class="noImg">
        <svg class="noImg__icon">
                <use xlink:href="img/sprite.svg#icon-sad2"></use>
                 </svg>
        <span class="noImg__text">image not available</span>
        </div>` : `<img src="${movie.Poster}" alt="${movie.Title}" class="movie__photo"></img>`;

    const markUp = `
    <div class="movie__result" href="#${movie.imdbID}">
                    ${img}
                    <div class="movie__details">
                        <h3 class="movie__name">${movie.Title}</h3>
                    </div>

    </div>`;

    elements.searchResList.insertAdjacentHTML('beforeend', markUp);
}

//loop through movie array and call renderMovie method on each movie 
export const renderResults = movies => {
    movies.Search.forEach(renderMovie);
}