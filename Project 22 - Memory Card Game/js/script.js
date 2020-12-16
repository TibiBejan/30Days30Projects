import AudioController from './audio.js';

class MemoryGame {
    constructor(cards, totalTime, audioController){
        this.cardsArr = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.querySelector('.remaining-time');
        this.flips = document.querySelector('.total-flips');
        this.audioController = audioController;
    }

    startGame(){
        // CLICKS AND COUNTDOWN TIME
        this.timeRemaining = this.totalTime;
        this.totalClicks = 0;
        // VARS TO CHECK CARDS
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.busy = false;
            this.countDown = this.startCountDown();
        }, 500);
        this.randomOrder(this.cardsArr);
        this.audioController.startMusic();
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.flips.innerText = this.totalClicks;
    }

    startCountDown(){
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0){
                this.gameOver();
            }
        }, 1000);
    }

    gameOver(){
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-overlay').classList.add('visible');
    }

    victory(){
        clearInterval(this.countDown);
        this.audioController.victory();
        document.getElementById('victory-overlay').classList.add('visible');
    }

    hideCards(){
        this.cardsArr.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    flipCards(card){
        if(this.canFlipCard(card)){
            this.audioController.flip();
            this.totalClicks++;
            this.flips.innerText = this.totalClicks;
            card.classList.add('visible');
            
            if(this.cardToCheck){
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }

    checkForCardMatch(card){
        if(this.getCardValue(card) === this.getCardValue(this.cardToCheck)){
            this.matchCards(card, this.cardToCheck);
        } else {
            this.missMatchCards(card, this.cardToCheck);
        }

        this.cardToCheck = null;
    }

    matchCards(card1, card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArr.length){
            this.victory();
        }
    }

    missMatchCards(card1, card2){
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    randomOrder(cardsArr){
        for(let i = cardsArr.length - 1; i > 0; i--){
            const randomIndex = Math.floor(Math.random() * (i + 1));
            cardsArr[randomIndex].style.order = i;
            cardsArr[i].style.order = randomIndex;
        }
    }

    canFlipCard(card){
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

    getCardValue(card){
        return card.querySelector('.card-value').src;
    }
}


if(document.readyState === 'loading'){
    window.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready(){
    const overlays = Array.from(document.getElementsByClassName('overlay-text'));
    const cards = Array.from(document.querySelectorAll('.game__content-card'));
    const audioController = new  AudioController();
    const game = new MemoryGame(cards, 50, audioController);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCards(card);
        });
    })
}