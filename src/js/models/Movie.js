import axios from 'axios';
import { apiKey, proxy } from '../config';

export default class Movie {
    constructor(id) {
        this.id = id;
    }
    async getMovie() {
        const apiKey = process.env.API_KEY;
        const proxy = process.env.PROXY;
        try {
            const res = await axios(`${proxy}http://www.omdbapi.com/?apikey=${apiKey}&i=${this.id}&type=movie&plot=full`);
            this.title = res.data.Title;
            this.imdbID = res.data.imdbID;
            this.poster = res.data.Poster;
            this.plot = res.data.Plot;
            this.year = res.data.Year;
            this.runTime = res.data.Runtime;
            this.director = res.data.Director;
            this.imdbRating = res.data.imdbRating;
        } catch (error) {
            console.log(error);
        }

    }
}