import {DOMManager} from './DOMManager.js';
import {Game} from './Game.js';
import {ApiService} from './ApiService.js';

const domManager = new DOMManager();
const game = new Game();

document.querySelector('.game-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    //----
    const formData = new FormData(event.target);
    const pseudo = JSON.stringify(formData.get('pseudonyme'));
    const difficulte = parseInt(formData.get('difficulte'));
    console.log(formData);
    console.log(pseudo);
    console.log(difficulte);
    //----
    try {
        const data = await ApiService.createGame(pseudo, difficulte);
        console.log('Success:', data, data.id);
        //----Le formulaire disparaît
        document.querySelector('.setup-form').classList.add('hidden');
        //----
        game.startGame(data.id);
        //----
        const collection = parseInt(formData.get('collection'));
        game.generateCards(collection, difficulte);
        domManager.createCards(game.cartes);

    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Erreur lors de la création de la partie');
    }
});
