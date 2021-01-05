import { elements } from './base';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.buttons__nav__like use').setAttribute('href', `img/sprite.svg#${iconString}`);
}

export const toggleLikeMenu = numLikes => {
    elements.likeMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';

}

export const renderLike = like => {

    const markUp = ` <div class="nav-like"  data-id="${like.id}">  
                                <div class="like-img">
                                    <img src='${like.img}' class="movie-img" alt="${like.name}">
                                </div>
                                    <h3>${like.name}</h3>
                                </div>
                            </div>`;

    elements.likeContainer.insertAdjacentHTML('beforeend', markUp);
}


export const deleteLike = id => {
    const el = document.querySelector(`.nav-like[id*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}