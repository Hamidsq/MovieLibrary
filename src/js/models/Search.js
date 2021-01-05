import axios from 'axios';
import { apiKey, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query
    }

    async getResults(page = 1) {
        const moviesList = [];

        try {
            while (page <= 4) {
                const res = await axios(`${proxy}http://www.omdbapi.com/?apikey=${apiKey}&s=${this.query}&type=movie&page=${page}`);
                this.responseData = res.data.Response;
                const response = res.data;
                response.Search.forEach(movies => moviesList.push(movies));


                page++;
                this.result = moviesList;
                this.page = page

            }

        } catch (error) {
            console.log(error);
        }



    }

}