function createCard(number, suit) {
    // add one to 0 indexed input number
    const inputNumber = number + 1;
    // create a div for the card body
    const cardBody = document.createElement("div");
    cardBody.className = "playingCard"
    cardBody.style.backgroundColor = "hsl(48, 39%, 83%)";
    cardBody.style.display = "flex";
    cardBody.style.width = "clamp(15px, 12vh, 12vh)";
    cardBody.style.height = "80%";
    cardBody.style.borderRadius = "10px";
    cardBody.style.position = "relative";
    cardBody.style.padding = "15px";
    cardBody.style.alignItems = "center"

    cardBody.dataset.number = number;
    cardBody.dataset.suit = suit;

    // Creates two spans that are positioned absolutely
    function appendSpans() {
        function createSpan() {
            const span = document.createElement("span");
            span.style.position = "absolute";
            span.style.fontSize = "clamp(1px, 2vw, 50px)";
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
        span0.style.left = "5%";
        span0.style.top = "5%";

        span1.style.right = "5%";
        span1.style.bottom = "5%"
        span1.style.transform = "rotate(180deg)";

        if (inputNumber === 1) {
            span0.textContent = "A";
            span1.textContent = "A";
        }
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
            column.style.height = "90%"
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
            symbolElement.style.width = "100%";
            symbolElement.style.alignitems = "space-between"
            symbolElement.style.margin = "auto"

            allSymbols.push(symbolElement)
        }
    }
    cardBody.append(leftColumn, centerColumn, rightColumn)
    // Define the original length for use in the calculations
    let originalLength = allSymbols.length;;


    // Append the appropriate symbols into columns


    if (originalLength < 4) {     // If there is 1 - 3 symbols they are all appended to the center column 
        allSymbols.forEach(Element => {
            centerColumn.append(Element)
        });
    } else if (allSymbols.length >= 4 && originalLength < 10) { //If there is 4 - 10 symbols put the symbols in 
        // IF there are an odd numnber of symbols add one to the center column
        if (originalLength % 2 === 1) {
            centerColumn.append(allSymbols.pop());
        }
        const leftOver = allSymbols.length;

        // Add a symbol to each outside column alernating to maintain the balance of the colums
        for (let i = 0; i < leftOver / 2; i++) {
            leftColumn.append(allSymbols.pop())
            rightColumn.append(allSymbols.pop())
        }
    } else if (originalLength === 10) {
        centerColumn.append(allSymbols.pop());
        centerColumn.append(allSymbols.pop());

        const leftOver = allSymbols.length;

        // Add a symbol to each outside column alernating to maintain the balance of the colums
        for (let i = 0; i < leftOver / 2; i++) {
            leftColumn.append(allSymbols.pop())
            rightColumn.append(allSymbols.pop())
        }
    } else if (originalLength === 11) {
        cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/jackRed.svg")') || 'url("./assets/cardAssets/svg/jackBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        centerColumn.append(allSymbols.pop(), allSymbols.pop())

    } else if (originalLength === 12) {
        // IF it is a queen, apply the queen background image and paste in a symbol
        cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/queenRed.svg")') || 'url("./assets/cardAssets/svg/queenBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        cardBody.style.backgroundSize = "contain"
        centerColumn.append(allSymbols.pop())
    } else if (originalLength === 13) {
        // IF it is a king, apply the king background image and paste in a symbol
        cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/kingRed.svg")') || 'url("./assets/cardAssets/svg/kingBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        cardBody.style.backgroundSize = "contain";
        centerColumn.append(allSymbols.pop());
    }
    return cardBody
}

// Deck booleen
// Boards are arrays
// { value: 0-12, suit: 0-3 }


class UI {
    constructor() {
        this.active = false;
        // Bind the update function to the initial instance
        this.update = this.update.bind(this);
    }

    async slideFromTo(element, orginElement, destinationElement) {
        while (this.active) {
            await new Promise((resolve) => setTimeout(resolve, 10))
        }

        this.active = true;

        destinationElement.append(element)

        const finalPosition = element.getBoundingClientRect();
        const initialPosition = orginElement.getBoundingClientRect()

        const xAxisdistance = (finalPosition.x - initialPosition.x) * -1
        const yAxisDistance = (finalPosition.y - initialPosition.y) * -1

        const animation = element.animate(
            [
                { transform: `translate(${xAxisdistance}px, ${yAxisDistance}px)` },
                { transform: "translate(0 , 0) rotate(360deg)" }
            ],
            {
                duration: 500,
                iterations: 1
            }
        )
        await animation.finished

        this.active = false
    }

    slideToDealer(element) {
        this.slideFromTo(element, this.deckGraphic, this.dealerBoardDisplay)
    }

    slideToPlayer(element) {
        this.slideFromTo(element, this.deckGraphic, this.playerBoardDisplay)
    }

    async animateShuffle() {
        this.deckGraphic.setAttribute("data-shuffle", "true")

        await new Promise((resolve) => setTimeout(resolve, 1500))

        this.deckGraphic.setAttribute("data-shuffle", "false")
    }

    async slideAway(element) {
        // Commented out to allow multiple cards to slide at a time
        // while (this.active) {
        //     await new Promise((resolve) => setTimeout(resolve, 10))
        // }

        this.active = true;


        const animation = element.animate(
            [
                { transform: `translateX(0)` },
                { transform: "translateX(100vw)" }
            ],
            {
                duration: 1000,
                iterations: 1
            }
        )
        await animation.finished

        element.parentNode.removeChild(element)

        this.active = false
    }

    // Provide this function with the current hand and the where to display and it will make sure the appropiate cards are added
    async updateTable(hand, handDisplay) {
        // // If something is still animating wait and check again in 10ms
        // while (this.active) {
        //     await new Promise((resolve) => setTimeout(resolve, 10))
        // }

        // Get all of the current card in the display
        // Create an empty array to push card objects to
        const displayedCard = Array.from(handDisplay.children)
        const existingDisplay = []

        // Creates an object that has the number and suit
        // Pushes that object for each card in the display to the existing display array
        displayedCard.forEach(card => {
            const cardObject = {
                number: parseInt(card.dataset.number),
                suit: card.dataset.suit
            }
            existingDisplay.push(cardObject)
        })

        // Find the extra cards by checking if the cards from the display exist in the hand
        // If they dont exist in the hand they are added to the extraCards array
        const extraCards = existingDisplay.filter(cardObject => {
            const exists = hand.some(existingCard => {
                cardObject.value === existingCard.number && cardObject.suit === existingCard.suit
            })
            return !exists
        })


        const displayed = Array.from(handDisplay.children)

        displayed.forEach(element => {
            extraCards.forEach(cardObject => {
                if (cardObject.number === parseInt(element.dataset.number) && cardObject.suit === element.dataset.suit) {
                    this.slideAway(element)
                }
            })
        })


        // This will create an array that contains cardObjects with the existing display information
        const graphicsUpdate = hand.filter(card => {
            const exists = existingDisplay.some(existingCard =>
                // Card object was created with the value
                card.value === existingCard.number && card.suit === existingCard.suit
            );
            return !exists
        });

        // Add the new cards into the deck
        graphicsUpdate.forEach(cardObject => {
            const cardElement = createCard(cardObject.value, cardObject.suit)

            this.slideFromTo(cardElement, this.deckGraphic, handDisplay)
        });

    }

    update(timestamp) {
        // TODO:updatePlayerTable()
        // TODO: updateDealerTable()
        // TODO: Is deck empty?

        console.log(timestamp)
        requestAnimationFrame(this.update)
    }

    start() {
        requestAnimationFrame(this.update)
    }

    // TODO: Create an init function that will accept the objects of play
    setup(playerTableDisplay, dealerTableDisplay, deckGraphic) {
        this.dealerBoardDisplay = dealerTableDisplay;
        this.playerBoardDisplay = playerTableDisplay;
        this.deckGraphic = deckGraphic;
    }

    init(playerHand, dealerHand, deckEmpty) {
        this.dealerHand = dealerHand;
        this.playerHand = playerHand;
        this.deckEmpty = deckEmpty
    }
}

const ui = new UI;
