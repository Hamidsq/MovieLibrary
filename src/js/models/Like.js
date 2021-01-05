export default class Likes {
    constructor() {
        this.likes = [];
    }
    addLike(id, img, name) {
        const like = { id, img, name };
        this.likes.push(like);

        this.persistData();
        return like;


    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);

        this.likes.splice(index, 1);

        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likedmovies', JSON.stringify(this.likes));
    }

    readFromLocalStorage() {
        //parses data back to original DT
        const likes = JSON.parse(localStorage.getItem('likedmovies'));

        //Restore/read the likes back to likes array
        if (likes) this.likes = likes;
    }
}