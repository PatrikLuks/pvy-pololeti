const symbols = ["\u2663", "\u2665", "\u2660", "\u2666"];   // Konstanta obsahujici obrazky na kartach
let attempts = 8; // Pocet pokusu
let matches = 0; // Pocet shod
let flippedCards = []; // Pocet otocenych karet
let lockBoard = false; // Zamrznuti
const gameBoard = document.getElementById('gameBoard'); // Herni plocha
const attemptCounter = document.getElementById('attemptCounter'); // Pocet pokusu
const resetButton = document.getElementById('resetButton'); // Tlacitko pro novou hru


 // Funkce pro vylozeni karet
 function setupGame() {
    // Vytvoreni balicku karet a zamichani
   // Kazda karta ma predni a zadni stranu s Unicode symbolem
   // Pridani karet na herni pole s event listenerem pro otoceni karet
   // (zde by mela byt HTML struktura pro gameBoard a attemptCounter)
    let deck = [...symbols, ...symbols];
    deck.sort(() => 0.5 - Math.random());
    deck.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;

        const cardInner = document.createElement('div');
        cardInner.classList.add('cardInner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('cardFront');

        const cardBack = document.createElement('div');
        cardBack.classList.add('cardBack');

        // Pouziti symbolu Unicode misto textoveho reprezentace
        cardBack.innerHTML = symbol;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}


 // Funkce pro otoceni karty
 function flipCard() {
       // Otoceni karty pouze pokud neni zamknuto a jeste nebyla otocena
   // Ulozeni otocenych karet do pole pro dalsi kontrolu
     if (lockBoard) return;
     if (this.classList.contains('flipped')) return;
     this.classList.add('flipped');
     if (!flippedCards[0]) {
         flippedCards[0] = this;
     } else {
         flippedCards[1] = this;
         checkForMatch();
     }
 }

 // Funkce pro kontrolu, zda jsou otocene karty shodne
 function checkForMatch() {
       // Kontrola, zda jsou otocene karty shodne
   // Volani odpovidajicich funkci pro shodu nebo neshodu
     if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
         disableCards();
     } else {
         unflipCards();
     }
 }

 // Funkce pro zablokovani karet, ktere jsou shodne, a aktualizaci herniho stavu
 function disableCards() {
       // Zablokovani karet, ktere jsou shodne, odebrani event listeneru
   // Aktualizace herniho stavu a kontrola konce hry
     flippedCards.forEach(card => {
         card.classList.add('matched');
         card.removeEventListener('click', flipCard);
     });
     resetBoard();
     matches++;
     attempts--;
     attemptCounter.textContent = `Attempts Remaining: ${attempts}`;
     checkGameEnd();
 }

 // Funkce pro otoceni karet zpet, pokud nejsou shodne
 function unflipCards() {
       // Otoceni karet zpet po kratkem zpozdeni
   // Resetovani herniho pole a aktualizace pokusu
   // Kontrola konce hry
     lockBoard = true;
     setTimeout(() => {
         flippedCards.forEach(card => {
             card.classList.remove('flipped');
         });
         resetBoard();
         attempts--;
         attemptCounter.textContent = `Attempts Remaining: ${attempts}`;
         checkGameEnd();
     }, 1000);
 }

 // Funkce pro resetovani herniho pole pro dalsi kolo
 function resetBoard() {
       // Resetovani pole otocenych karet a odemknuti herniho pole
     flippedCards = [];
     lockBoard = false;
 }

 // Funkce pro kontrolu konce hry a zpracovani scenaru konce hry
 function checkGameEnd() {
       // Kontrola, zda hrac vyhral nebo prohral
   // Zobrazeni odpovidajiciho dialogoveho okna a reset hry
     if (matches === 4) {
         setTimeout(() => {
             if (confirm("You win! Play again?")) {
                 resetGame();
             }
         }, 500);
     } else if (attempts === 0) {
         setTimeout(() => {
             if (confirm("Game Over! You lose. Play again?")) {
                 resetGame();
             }
         }, 500);
     }
 }

 // Funkce pro resetovani hry a spusteni noveho kola
 function resetGame() {
       // Resetovani herniho pole, nastaveni poctu pokusu a nalezenych paru
   // Znovu nastaveni hry
     gameBoard.innerHTML = '';
     attemptCounter.textContent = 'Attempts Remaining: 8';
     attempts = 8;
     matches = 0;
     setupGame();
 }

 // Pocatecni volani pro nastaveni hry pri nacitani stranky
 setupGame();
