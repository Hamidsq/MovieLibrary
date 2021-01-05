export default class Watch {
    constructor() {
        this.watch = [];
    }
    addWatch(id, name, img) {
        const watch = { id, name, img };
        this.watch.push(watch);

        this.saveWatch();
        return watch;
    }

    deleteWatch(id) {
        const index = this.watch.findIndex(el => el.id === id);
        this.watch.splice(index, 1);

        this.saveWatch();

    }

    isWatch(id) {
        return this.watch.findIndex(el => el.id === id) !== -1;
    }

    getNumWatch() {
        return this.watch.length;
    }

    saveWatch() {
        localStorage.setItem('addWatch', JSON.stringify(this.watch));
    }

    readWatch() {
        const watch = JSON.parse(localStorage.getItem('addWatch'));
        if (watch) this.watch = watch;
    }

}