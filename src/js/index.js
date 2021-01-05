import Search from './models/Search';
import * as searchView from './views/searchView';
import { clearLoader, elements, renderLoader, renderHomePage } from './views/base';
import Movie from './models/Movie';
import * as movieView from './views/movieView';
import '../sass/main.scss';
import Likes from './models/Like';
import * as likeView from './views/likeView';
import Watch from './models/Watch';
import * as watchView from './views/watchView';
/* GLOBAL STATE OF THE APP
SEARCH OBJECT
MOVIE OBJECT
LIKE OBJECT
WATCH LIST OBJECT   */

const state = {};

const searchController = async(type, page) => {

    if (type === 'newSearch') {

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
                await state.search.getResults();

                //5-RENDER the results on UI
                clearLoader();
                searchView.searchQuery(state.search);
                searchView.renderResults(state.search.result);

            } catch (error) {
                console.log(error)
            }
        }
    } else if (type === 'oldSearch') {
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



const movieController = async(movieID, fromNavbar = false) => {
    //Grab movie ID
    console.log(movieID);
    if (movieID) {

        searchView.clearResult();
        //Prepare UI for changes
        renderLoader(elements.searchResList);

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
        movieView.renderMovie(
            state.movie,
            state.likes.isLiked(movieID),
            state.watch.isWatch(movieID),
            fromNavbar);
    }
}



/****LIKE CONTROLLER******/

const likeController = () => {
    if (!state.likes) state.likes = new Likes();
    const movieID = state.movie.imdbID;

    if (!state.likes.isLiked(movieID)) {
        const newLike = state.likes.addLike(state.movie.imdbID,
            state.movie.poster, state.movie.title);

        //TOGGLE THE LIKE BUTTON
        likeView.toggleLikeBtn(true);


        //ADD TO LIKE LIST-NAVBAR
        likeView.renderLike(newLike);

    } else {

        //DELETE LIKE FROM DATA STRUCTURE
        state.likes.deleteLike(movieID);

        //TOGGLE THE LIKE BUTTON
        likeView.toggleLikeBtn(false);

        //DELETE FROM LIKE LIST-NAVBAR 
        likeView.deleteLike(movieID);

    }
    //toggle the like menu
    likeView.toggleLikeMenu(state.likes.getNumLikes());




}

const watchController = () => {
    //CREATE WATCH OBJECT
    if (!state.watch) state.watch = new Watch();

    //RETREIVE MOVIE ID
    const movieID = state.movie.imdbID;
    //CHECK IF MOVIE ISN'T ADDED TO WATCH LIST
    if (!state.watch.isWatch(movieID)) {
        const newWatch = state.watch.addWatch(
            movieID, state.movie.title, state.movie.poster);

        //TOGGLE THE WATCH BUTTON
        watchView.toggleWatchBtn(true);

        //ADD MOVIE TO WATCH LIST NAVBAR
        //console.log(newWatch);
        watchView.renderWatch(newWatch);

    } else {
        //DELETE MOVIE FROM WATCH LIST DT
        state.watch.deleteWatch(movieID);


        //TOGGLE THE WATCH BUTTON
        watchView.toggleWatchBtn(false);

        //DELETE MOVIE FROM NAVBAR
        watchView.deleteWatch(movieID);

    }

    //TOGGLE THE WATCH 
    watchView.toggleWatchMenu(state.watch.getNumWatch());

}
window.addEventListener('load', () => {


    renderHomePage();
    state.likes = new Likes();

    //Restore likes to likes array after the pages has been loaded
    state.likes.readFromLocalStorage();

    //toggle the like menu
    likeView.toggleLikeMenu(state.likes.getNumLikes());

    //render the likes 
    state.likes.likes.forEach(like => likeView.renderLike(like));

    state.watch = new Watch();

    //Restore likes to likes array after the pages has been loaded
    state.watch.readWatch();

    //toggle the watch menu
    watchView.toggleWatchMenu(state.watch.getNumWatch());

    //render the watch
    watchView.renderAll(state.watch.watch);
    //state.watch.watch.forEach(watch => watchView.renderWatch(watch));
})

/****EVENTLISTENERS******/
//search for new movie
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchController('newSearch');
});

//go to movie page based on user preference
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn__page');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResults(state.search.result, goToPage);
    }
});



elements.searchResList.addEventListener('click', e => {
    const movie = e.target.closest('.movie__result');
    if (movie) {
        const movieID = movie.dataset.id;
        movieController(movieID);
    }
});

//go back to search result 
const button = document.querySelector('.btn__back');
elements.searchResList.addEventListener('click', e => {
    const backBtn = e.target.closest('.btn__back');
    if (backBtn) {
        searchController('oldSearch', state.search.result.page)
    }
});


elements.searchResList.addEventListener('click', e => {
    //const likeBtn = e.target.closest('.buttons__nav__like')
    if (e.target.matches('.buttons__nav__like', '.buttons__nav__like *')) {
        likeController();
    } else if (e.target.matches('.buttons__nav__watch', '.buttons__nav__watch*')) {
        console.log('works');
        watchController();
    }
});

elements.likeContainer.addEventListener('click', e => {
    const movie = e.target.closest('.nav-like');
    const movieID = movie.dataset.id;
    if (movie) movieController(movieID, true);


});

elements.watchContainer.addEventListener('click', e => {
    const movie = e.target.closest('.nav-addWatch');
    const movieID = movie.dataset.id;
    if (movie) movieController(movieID, true);

});