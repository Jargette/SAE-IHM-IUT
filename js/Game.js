import {imageCollections} from './ImageCollection.js';
import {ApiService} from './ApiService.js';

//----
const images = [imageCollections.animals, imageCollections.fruits, imageCollections.cars]

//----

export class Game {
    /**
     * @type {number} id identifiant de la partie en cours
     */
    #id;

    //
    timerInterval;
    cartes = [];
    nbPaires;

    async endGame() {
        //Todo
        clearInterval(this.timerInterval);

        const idARemplacer = this.#id;
        const nombreDePairesRestanteARemplacer = 5678;

        try {
            const result = await ApiService.updateGameResult(idARemplacer, nombreDePairesRestanteARemplacer);
            console.log('Fin de partie:', result);
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Erreur lors de la fin de la partie');
        }
    }

    /**
     * Start a new game.
     * @param {number} id - The game ID.
     */
    startGame(id) {
        this.#id = id;

        //todo
        const gameArea = document.querySelector('.game-area')
        gameArea.classList.remove('hidden');
        this.startTimer();
        this.boutonAbandon();
        console.log(imageCollections)
        //----
    }

    //todo
    //----
    startTimer() {
        let time = 180;
        const timer = document.createElement('div');
        timer.classList.add('game-timer');
        timer.innerHTML = `Temps restant : ${time} s`;
        document.querySelector('.game-area-header').append(timer);
        this.timerInterval = setInterval(() => {
            time -= 1;
            timer.innerHTML = `Temps restant : ${time}s`;
            if (time === 0) {
                this.endGame();
            }
        }, 1000);

    }

    boutonAbandon() {
        const abandon = document.createElement('button')
        abandon.id = 'abandon'
        abandon.innerHTML = "Abandonner";
        abandon.addEventListener('click', this.endGame.bind(this));
        document.querySelector('.game-area-header').append(abandon)
    }

    /**
     * Crée le tableau de cartes dans le jeu
     * @param {number}collection
     * @param {number}difficulte
     */
    generateCards(collection, difficulte) {
        const theme = images[collection];
        this.nbPaires = 4 + difficulte;
        for (let i = 0; i < this.nbPaires; ++i) {
            this.cartes.push(theme[i]);
            this.cartes.push(theme[i]);
        }
    }
}
