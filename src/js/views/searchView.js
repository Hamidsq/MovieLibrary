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
}

//display the search term

export const searchQuery = search => {
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
                 <h1>No search results found for &ldquo;${search.query}&rdquo;</h1>
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
    <div class="movie__result" href="#${movie.imdbID}" data-id=${movie.imdbID}>
                    ${img}
                    <div class="movie__details">
                        <h3 class="movie__name">${movie.Title}</h3>
                    </div>

    </div>`;
    elements.searchResList.insertAdjacentHTML('beforeend', markUp);
}

const createButton = (page, type) => ` <a href="#" class="pagination__${type} " data-goto=${type=== 'previous'? page -1 : page +1}>
 page ${type === 'previous'? page - 1 : page +1} ${type === 'previous' ? '&laquo;' :'&raquo;' }</a>`;


const renderButton = (page, numResults, resPerPage) => {
        //number of pages we have
        const pages = Math.ceil(numResults / resPerPage);
        let button;
        if (page === 1 && pages > 1) {
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
        elements.searchResPages.insertAdjacentHTML('afterbegin', button);
    }
    //loop through movie array and call renderMovie method on each movie 
    //display 10 movies per page
export const renderResults = (movies, page = 1, resPerPage = 10) => {
    //console.log(movies);
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    movies.slice(start, end).forEach(renderMovie);

    //enable navigation to other pages
    renderButton(page, movies.length, resPerPage);


}