const deckObject = {
    cards: [],
    numberOfDecks: 1,
    numberOfCards: 52,

    /*
     Create 
     fills the cards array with 52 cards times the number of decks.  
     It then shuffles the cards by traversing thru the array starting at the end of the array and randomly swapping the values of the index
    */
    create: function () {
        for (let i = 0; i < this.numberOfDecks; i++)
            for (let j = 0; j < this.numberOfCards; j++) {
                this.cards.push(j);
            }

        let array = this.cards
        let tmp, current, top = array.length;

        if (top) while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
        cards = array;
    },
}


/*  Function: drawcard
    The purpose for this function is to draw a card from the deck, before doing so it checks to see if there are any cards in the deck, refills and shuffles deck if empty.
    The method to pull out the value and suit of the card is done by running two math operations on the value of the card that was popped from the deck. 
*/
drawCard = function (deck) {
    if (deck.cards.length == 0) {
        deck.create;
    }
    let temp = deck.cards.pop();
    function createCard(number, suit) {
        // add one to 0 indexed input number
        const inputNumber = number + 1;
        // create a div for the card body
        const cardBody = document.createElement("div");
        cardBody.className = "playingCard"
        cardBody.style.backgroundColor = "hsl(48, 39%, 83%)";
        cardBody.style.display = "flex";
        cardBody.style.width = "125px";
        cardBody.style.height = "180px";
        cardBody.style.borderRadius = "10px";
        cardBody.style.position = "relative";
        cardBody.style.padding = "15px";


        // Creates two spans that are positioned absolutely
        function appendSpans() {
            function createSpan() {
                const span = document.createElement("span");
                span.style.position = "absolute";
                span.style.fontSize = "32px";
                span.style.fontWeight = "bolder";
                span.style.fontFamily = "serif";
                span.style.color = color;
                span.textContent = inputNumber;

                return span
            }

            const color = ((suit === "heart" || suit === "diamond") && "red") || "black";
            const span0 = createSpan();
            const span1 = createSpan()

            // Position each span individually and rotate the second
            span0.style.left = "10px";
            span0.style.top = "10px";

            span1.style.right = "10px";
            span1.style.bottom = "10px"
            span1.style.transform = "rotate(180deg)";


            if (inputNumber === 11) {
                span0.textContent = "J";
                span1.textContent = "J";
            }
            if (inputNumber === 12) {
                span0.textContent = "Q";
                span1.textContent = "Q";
            }
            if (inputNumber === 13) {
                span0.textContent = "K";
                span1.textContent = "K";
            }

            cardBody.append(span0, span1);
        }
        appendSpans();

        // Creates 3 equal sized coloums and returns them in an array
        function columns() {
            const columns = []
            for (let i = 0; i < 3; i++) {
                const column = document.createElement("div");
                column.style.display = "flex";
                column.style.flexDirection = "column";
                column.style.flex = "1";
                column.style.height = "100%";
                columns.push(column);

            }
            return columns;
        }

        // create an array and assign each column as the appropriate variable
        const columnArray = columns();
        const leftColumn = columnArray[0];
        const centerColumn = columnArray[1];
        const rightColumn = columnArray[2];
        const allSymbols = [];

        if (typeof inputNumber === "number") {
            // Determine which symbol to load depending on the suit
            const symbolSource = (suit === "heart" && "./assets/cardAssets/symbols/hearts.png") ||
                (suit === "club" && "./assets/cardAssets/symbols/clubs.png") ||
                (suit === "diamond" && "./assets/cardAssets/symbols/diamonds.png") ||
                (suit === "spade" && "./assets/cardAssets/symbols/spades.png");

            // Create as many symbols as the input number and add them to the allSymbols array 
            for (let i = 0; i < inputNumber; i++) {
                const symbolElement = document.createElement("img");

                symbolElement.src = symbolSource;
                symbolElement.style.height = "auto";
                symbolElement.style.width = "50%";
                symbolElement.style.alignitems = "space-between"
                symbolElement.style.margin = "auto"

                allSymbols.push(symbolElement)
            }
        }
        cardBody.append(leftColumn, centerColumn, rightColumn)

        // IF the symbol array is 3 or less, add all of the symbols to the center div
        if (allSymbols.length < 4) {
            allSymbols.forEach(Element => {
                centerColumn.append(Element)
            });
        }
        // Define the original length for use in the calculations
        let originalLength = allSymbols.length;;

        // IF there are between 4 and 10 symbols
        if (allSymbols.length >= 4 && allSymbols.length <= 10) {
            // IF there are an odd numnber of symbols add one to the center column
            if (originalLength % 2 === 1) {
                centerColumn.append(allSymbols.pop());
            }
            originalLength = allSymbols.length;

            // Add a symbol to each outside column alernating to maintain the balance of the colums
            for (let i = 0; i < originalLength / 2; i++) {
                leftColumn.append(allSymbols.pop())
                rightColumn.append(allSymbols.pop())
            }
        }
        // IF it is a jack, apply the jack background image and paste in two symbols
        if (allSymbols.length === 11) {
            cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/jackRed.svg")') || 'url("./assets/cardAssets/svg/jackBlack.svg")'
            cardBody.style.backgroundRepeat = "no-repeat";
            cardBody.style.backgroundPosition = "center";
            centerColumn.append(allSymbols.pop(), allSymbols.pop())

        } else if (allSymbols.length === 12) {
            // IF it is a queen, apply the queen background image and paste in a symbol
            cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/queenRed.svg")') || 'url("./assets/cardAssets/svg/queenBlack.svg")'
            cardBody.style.backgroundRepeat = "no-repeat";
            cardBody.style.backgroundPosition = "center";
            cardBody.style.backgroundSize = "contain"
            centerColumn.append(allSymbols.pop())
        } else if (allSymbols.length === 13) {
            // IF it is a king, apply the king background image and paste in a symbol
            cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/kingRed.svg")') || 'url("./assets/cardAssets/svg/kingBlack.svg")'
            cardBody.style.backgroundRepeat = "no-repeat";
            cardBody.style.backgroundPosition = "center";
            cardBody.style.backgroundSize = "contain";
            centerColumn.append(allSymbols.pop());
        }
        return cardBody
    }
    const cardInfo = { value: temp % 13, suit: Math.floor(temp / 13) };
    return cardInfo;
}





// This is the board object that we can copy from
const board = {
    dealerHand: [],
    playerHand: [],
    dealToDealer: function (cardObject) {
        this.dealerHand.push(cardObject)
    },
    dealToPlayer: function (cardObject) {
        this.playerHand.push(cardObject)
    }
}





/*
pseudo code/game rules for game logic:
    rules: all cards to player are dealt face up
        value of aces are 1 or 11, rule to 1 or 11 if hand + 11 <= 21 then the ace is worth 11 otherwise its worth 1
 
    
    deal a card to player
    deal a card to the dealer face down
    deal a card to player
    deal a card to the dealer face up
 
    rules for blackjack after the deal
        if player has blackjack flip dealers down card face up, check for dealer blackjack if dealer has blackjack its a push otherwise player wins
        if the dealer has an ace for his up card (get the sum of the dealers hand) if the dealer has blackjack flip the down card to show the  blackjack, player loses
 
    continuing game play past the initial deal
        Player is asked to take a hit or stay
            hit the player gets a card the value of the card is added to the hand if it exceeds 21 the player loses the hand
            the player can hit as many times as they like until they stay or until they bust.
        player stays play is turned over to dealer
            if the dealer has a score of less than 17 they will take hits until their score >= 17 or they bust
        after the dealer is done hitting or has stood the two hands are compared for scoring 
        player > dealer player wins
        player < dealer player loses
        player = dealer its a push
 
*/
const game = {};





