export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__input'),
    searchResList: document.querySelector('.movie__container'),
    movieContainer: document.querySelector('.film-posters'),
    movieSearched: document.querySelector('.movie__searched'),
    searchResPages: document.querySelector('.pagination'),
    singleMovie: document.querySelector('.single__movie'),
    backBtn: document.querySelector('.btn__back')
}
export const elementStrings = {
    loader: 'loader'
}

//render the loader before results comes from API call/attaching the loader to parent element
export const renderLoader = parent => {

    const loader = `<div class="${elementStrings.loader}">
                    <div class="spinner">
                         <span>Loading...</span>
                    </div>
                </div>`;

    parent.insertAdjacentHTML('afterbegin', loader);
}

//clear the loader when movie data is being displayed 
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}