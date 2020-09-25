import Search from './models/Search';
import * as searchView from './views/searchView';
import { clearLoader, elements, renderLoader } from './views/base';
import '../sass/main.scss';
/* GLOBAL STATE OF THE APP
SEARCH OBJECT
MOVIE OBJECT
LIKE OBJECT
WATCH LIST OBJECT   */

const state = {};

const searchController = async() => {

    //1-GET SEARCH QUERY FROM SEARCHVIEW
    const query = searchView.getInput();
    searchView.searchQuery(query);


    if (query) {
        //2-CREATE SEARCH OBJECT
        state.search = new Search(query);

        //3-PREPARE UI FOR RESULTS LIKE LOADER AND CLEAR SEARCH INPUT

        searchView.clearInput();
        searchView.clearResult();
        //searchView.searchQuery(state.search);
        renderLoader(elements.searchResList);



        try {

            //4-SEARCH FOR MOVIES  
            await state.search.getResults();

            //5-RENDER the results on UI
            clearLoader();
            searchView.searchQuery(state.search.result);
            searchView.renderResults(state.search.result);

        } catch (error) {
            console.log(error)
        }


    }


}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchController();
});