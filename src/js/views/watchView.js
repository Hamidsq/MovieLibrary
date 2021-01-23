import { elements } from "./base";

export const toggleWatchBtn = isWatch => {
    const iconString = isWatch ? 'icon-bookmark' : 'icon-bookmark-o';
    console.log(iconString);
    document.querySelector('.buttons__nav__watch use').setAttribute('href', `img/sprite.svg#${iconString}`);
}


export const toggleWatchMenu = getNumWatch => {
    elements.watchMenu.style.visibility = getNumWatch > 0 ? 'visible' : 'hidden';
}


export const renderWatch = watch => {

    if (watch) {
        const markUp = `<li class="nav-addWatch" data-id="${watch.id}">
                        <div class="addWatch-img">
                            <img src='${watch.img}' class="movie-img" alt="${watch.name}">
                        </div>
                        <div class="addWatch-name">
                            <h3>${watch.name}</h3>
                        </div>

                    </li>`;


        elements.watchContainer.insertAdjacentHTML('afterbegin', markUp);

    }
}

export const renderAll = watch => {
    watch.forEach(renderWatch);
}

export const deleteWatch = id => {
    const el = document.querySelector(`.nav-addWatch[data-id="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}