import Search from './models/Search';
import * as searchView from './views/searchView';
import { clearLoader, elements, renderLoader } from './views/base';
import Movie from './models/Movie';
import * as movieView from './views/movieView';
import '../sass/main.scss';
/* GLOBAL STATE OF THE APP
SEARCH OBJECT
MOVIE OBJECT
LIKE OBJECT
WATCH LIST OBJECT   */

const state = {};

const searchController = async(page) => {

    //1-GET SEARCH QUERY FROM SEARCHVIEW
    const query = searchView.getInput();
    if (query) {
        //2-CREATE SEARCH OBJECT
        state.search = new Search(query);

        //3-PREPARE UI FOR RESULTS LIKE LOADER AND CLEAR SEARCH INPUT
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchResList);
        try {
            //4-SEARCH FOR MOVIES  
            await state.search.getResults(page);

            //5-RENDER the results on UI
            clearLoader();
            searchView.searchQuery(state.search);
            searchView.renderResults(state.search.result);

        } catch (error) {
            console.log(error)
        }
    }
}



const movieController = async(movieID) => {
    //Grab movie ID
    if (movieID) {

        //Prepare UI for changes
        movieView.clearMovie();

        //create movie object
        state.movie = new Movie(movieID);

        //Get movie data
        try {

            await state.movie.getMovie();
        } catch (error) {
            console.log(error);
        }

        //render movie
        clearLoader();
        movieView.renderMovie(state.movie);
    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchController();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target;
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResults(state.search.result, goToPage);
    }
});

//window.addEventListener('hashchange', movieController);

elements.searchResList.addEventListener('click', e => {
    const movie = e.target.closest('.movie__result');
    const movieID = movie.dataset.id;
    movieController(movieID);
});

//elements.backBtn.addEventListener('click', movieView.goBack());