import {DOMManager} from './DOMManager.js';
import {Game} from './Game.js';
import {ApiService} from './ApiService.js';

const domManager = new DOMManager();
const game = new Game();

document.querySelector('.game-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    //----
    const formData = new FormData(event.target);
    const pseudo = formData.get('pseudonyme');
    const difficulte = parseInt(formData.get('difficulte'));
    console.log(formData);
    console.log(pseudo);
    console.log(difficulte);
    document.querySelector('.setup-form').classList.add('hidden');
    //----
    try {
        const data = await ApiService.createGame(pseudo, difficulte);
        console.log('Success:', data, data.id);
        game.startGame(data.id);
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Erreur lors de la création de la partie');
    }

});
