import {imageCollections} from './ImageCollection.js';
import {ApiService} from './ApiService.js';

export class Game {
    /**
     * @type {number} id identifiant de la partie en cours
     */
    #id;
    //----
    timerInterval;
    pairs;
    firstCard = null;
    secondCard = null;
    lock = false;
    pairsRestantes;
    //----

    async endGame() {
        //----
        clearInterval(this.timerInterval);
        //----

        const idARemplacer = this.id;
        const nombreDePairesRestanteARemplacer = this.pairs;

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
     * //----
     * @param {number} difficulty
     * @param {string} collection
     * //----
     */
    startGame(id, difficulty, collection) {
        this.#id = id;
        //----
        this.pairs = 4+difficulty;
        for (const col of imageCollections){
            if (JSON.stringify(col)===collection) {
                const cartes = col;
                createCards(cartes, this.totalPairs);
            }
        }
        document.querySelectorAll('.card-back').forEach(carte => {
            carte.addEventListener('click', this.flipCard(carte))})
        this.startTimer();
        const abandon = document.createElement('button')
        abandon.innerHTML="Abandon";
        abandon.addEventListener('click', this.endGame.bind(this));
        document.querySelector('.game-area-header').append(abandon)
        //----
    }
    //----
    startTimer() {
        let time = 180;
        const timer = document.createElement('p');
        document.querySelector('.game-area-header').append(timer);
        this.timerInterval = setInterval(() => {
            time-=1;
            timer.innerHTML = `Temps restant : ${time} s.`;
        }, 1000);

    }

    flipCard(card) {

        if (this.lock || card.classList.contains("hidden")) return;

        card.classList.add("hidden");
        card.textContent = card.dataset.value;

        if (!this.firstCard) {
            this.firstCard = card;
            return;
        }

        this.secondCard = card;

        if (this.firstCard.dataset.value === this.secondCard.dataset.value) {
            this.pairs-=1;
            this.resetTurn();
            if(this.pairs === 0){
                this.endGame();
            }
        } else {
            this.lock = true;
            setTimeout(() => {
                this.firstCard.classList.remove("hidden");
                this.secondCard.classList.remove("hidden");
                this.resetTurn();
            }, 1000);
        }
    }

    resetTurn() {
        this.firstCard = null;
        this.secondCard = null;
        this.lock = false;
    }
}
