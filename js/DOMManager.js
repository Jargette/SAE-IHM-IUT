export class DOMManager {

    /**
     * Ajoute toutes les images d'une collection sur le gameBoard
     * @param {Image[]} images
     */
    createCards(images) {
        const gameBoard = document.querySelector('.game-board');
        const template = document.querySelector('#carteAJouer');
        let tab = [];
        let i = 0
        for (const image of images) {
            const newDiv = document.importNode(template.content, true);
            newDiv.querySelector('.card-back')
                .querySelector('img')
                .setAttribute('src', image.url);
            newDiv.querySelector('.card-back')
                .querySelector('img')
                .setAttribute('alt', image.name);
            gameBoard.append(newDiv);
        }
        /**
         * Voici un exemple de contenu de card permettant de contenir une partie masqué
         * et l'image qui doit être révélée.
         *
         <div class="card-inner">
         <div class="card-front">
         <img src="./assets/images/mask1.jpg" alt="Hidden card">
         </div>
         <div class="card-back hidden">
         <img src="${image.url}" alt="${image.name}">
         </div>
         </div>
         */

    }
}
