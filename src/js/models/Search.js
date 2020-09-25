import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query
    }

    async getResults() {
        const apiKey = 'b9f62c9a';
        const proxy = 'http://cors-anywhere.herokuapp.com/';
        try {
            const res = await axios(`${proxy}http://www.omdbapi.com/?apikey=${apiKey}&s=${this.query}&type=movie`);
            this.result = res.data;
        } catch (error) {
            console.log(error);
        }

    }
}