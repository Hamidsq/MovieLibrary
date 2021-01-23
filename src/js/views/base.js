export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__input'),
    searchResList: document.querySelector('.movie__container'),
    movieContainer: document.querySelector('.film-posters'),
    movieSearched: document.querySelector('.movie__searched'),
    searchResPages: document.querySelector('.pagination'),
    singleMovie: document.querySelector('.single__movie'),
    backBtn: document.querySelector('.btn__back'),
    likeMenu: document.querySelector('.like'),
    likeContainer: document.querySelector('.user-nav__like'),
    watchMenu: document.querySelector('.addWatch'),
    watchContainer: document.querySelector('.user-nav__addWatch'),
    homepage: document.querySelector('.homePage')
}
export const elementStrings = {
    loader: 'load'
}

//render the loader before results comes from API call/attaching the loader to parent element
export const renderLoader = parent => {

    const loader = ` <div class="${elementStrings.loader}">
                            <div class="spin">
                     </div>`;

    parent.insertAdjacentHTML('afterbegin', loader);
}

//clear the loader when movie data is being displayed 
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}

//render homepage 
export const renderHomePage = () => {
    const markUp = `<div class="homePage__heading">
                        <p class="homePage__heading--main">Movie Library</p>
                        <p class="homePage__heading--sub">Browse movies to find your favourite movie to watch</p>
                    </div>
                    <div class="homePage__img"></div>`;

    elements.homepage.insertAdjacentHTML('beforeend', markUp);



}