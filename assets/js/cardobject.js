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
    cardBody.style.overflow = "hidden"

    cardBody.dataset.number = number;
    cardBody.dataset.suit = suit;

    const symbolSource = (suit === "heart" && "./assets/cardAssets/symbols/hearts.png") ||
        (suit === "club" && "./assets/cardAssets/symbols/clubs.png") ||
        (suit === "diamond" && "./assets/cardAssets/symbols/diamonds.png") ||
        (suit === "spade" && "./assets/cardAssets/symbols/spades.png");

    // Creates two spans that are positioned absolutely
    function appendSpans() {
        function createSpan() {
            const span = document.createElement("span");
            span.style.position = "absolute";
            span.style.fontSize = "clamp(1px, 2vw, 20px)";
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
            const symbol0 = document.createElement("img")
            symbol0.src = symbolSource
            symbol0.style.position = "absolute"
            symbol0.style.width = "100%";
            symbol0.style.bottom = "-100%"
            symbol0.style.left = "50%"
            symbol0.style.transform = "translateX(-50%)"

            const symbol1 = document.createElement("img")
            symbol1.src = symbolSource
            symbol1.style.position = "absolute"
            symbol1.style.width = "100%";
            symbol1.style.bottom = "-100%"
            symbol1.style.left = "50%"
            symbol1.style.transform = "translateX(-50%)"

            span0.textContent = "J";
            span1.textContent = "J";
            span0.style.width = '20%'
            span1.style.width = '20%'

            span0.appendChild(symbol0)
            span1.appendChild(symbol1)
        }
        if (inputNumber === 12) {
            const symbol0 = document.createElement("img")
            symbol0.src = symbolSource
            symbol0.style.position = "absolute"
            symbol0.style.width = "100%";
            symbol0.style.bottom = "-100%"
            symbol0.style.left = "50%"
            symbol0.style.transform = "translateX(-50%)"

            const symbol1 = document.createElement("img")
            symbol1.src = symbolSource
            symbol1.style.position = "absolute"
            symbol1.style.width = "100%";
            symbol1.style.bottom = "-100%"
            symbol1.style.left = "50%"
            symbol1.style.transform = "translateX(-50%)"

            span0.textContent = "Q";
            span1.textContent = "Q";
            span0.style.width = '20%'
            span1.style.width = '20%'

            span0.appendChild(symbol0)
            span1.appendChild(symbol1)
        }
        if (inputNumber === 13) {
            const symbol0 = document.createElement("img")
            symbol0.src = symbolSource
            symbol0.style.position = "absolute"
            symbol0.style.width = "100%";
            symbol0.style.bottom = "-100%"
            symbol0.style.left = "50%"
            symbol0.style.transform = "translateX(-50%)"

            const symbol1 = document.createElement("img")
            symbol1.src = symbolSource
            symbol1.style.position = "absolute"
            symbol1.style.width = "100%";
            symbol1.style.bottom = "-100%"
            symbol1.style.left = "50%"
            symbol1.style.transform = "translateX(-50%)"

            span0.textContent = "K";
            span1.textContent = "K";
            span0.style.width = '20%'
            span1.style.width = '20%'

            span0.appendChild(symbol0)
            span1.appendChild(symbol1)
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

    } else if (originalLength === 12) {
        // IF it is a queen, apply the queen background image and paste in a symbol
        cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/queenRed.svg")') || 'url("./assets/cardAssets/svg/queenBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        cardBody.style.backgroundSize = "contain"
    } else if (originalLength === 13) {
        // IF it is a king, apply the king background image and paste in a symbol
        cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/kingRed.svg")') || 'url("./assets/cardAssets/svg/kingBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        cardBody.style.backgroundSize = "contain";
    }
    return cardBody
}







class UI {
    constructor() {
        this.active = false;
        this.cardsDealt = 0
        // Bind the update function to the initial instance
        this.update = this.update.bind(this);
    }

    // This is a setup function that finds the addresses for the area to display each animation
    setup(playerTableDisplay, dealerTableDisplay, deckGraphic) {
        this.dealerBoardDisplay = dealerTableDisplay;
        this.playerBoardDisplay = playerTableDisplay;
        this.deckGraphic = deckGraphic;
    }
    // This is an init function that finds the addresses for the game objects from the games logic
    init(playerHand, dealerHand, deckEmpty) {
        this.dealerHand = dealerHand;
        this.playerHand = playerHand;
        this.deckEmpty = deckEmpty
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
        this.dealerBoardDisplay.dataset.gameOver = "false"
        this.slideFromTo(element, this.deckGraphic, this.dealerBoardDisplay)
    }

    slideToPlayer(element) {
        this.slideFromTo(element, this.deckGraphic, this.playerBoardDisplay)
    }

    async animateShuffle() {
        this.active = true

        const slideIn = this.deckGraphic.animate(
            [
                { transform: `translateX(-20vw)` },
                { transform: "translateX(0)" }
            ],
            {
                duration: 2000,
                iterations: 1
            }
        )
        await slideIn.finished


        this.deckGraphic.setAttribute("data-shuffle", "true")

        await new Promise((resolve) => setTimeout(resolve, 1500))

        this.deckGraphic.setAttribute("data-shuffle", "false")

        this.active = false
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

    revealCard() {
        this.dealerBoardDisplay.dataset.gameOver = "true"
        return
    }

    // Provide this function with the current hand and the where to display and it will make sure the appropiate cards are added
    updateTable(hand, handDisplay) {
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

                const suit = cardObject.suit === "heart" ? 0 :
                    cardObject.suit === "spade" ? 1 :
                        cardObject.suit === "diamond" ? 2 :
                            cardObject.suit === "club" ? 3 :
                                null

                return cardObject.number === existingCard.value && suit === existingCard.suit
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
            const exists = existingDisplay.some(existingCard => {
                const suit =
                    existingCard.suit === "heart" ? 0 :
                        existingCard.suit === "spade" ? 1 :
                            existingCard.suit === "diamond" ? 2 :
                                existingCard.suit === "club" ? 3 :
                                    null; // Default case if suit doesn't match


                // Card object was created with the value
                return card.value === existingCard.number && card.suit === suit
            });
            return !exists
        });


        // Add the new cards into the deck
        graphicsUpdate.forEach(cardObject => {

            const suit = (cardObject.suit === 0 && "heart") ||
                (cardObject.suit === 1 && "spade") ||
                (cardObject.suit === 2 && "diamond") ||
                (cardObject.suit === 3 && "club")
            const cardElement = createCard(cardObject.value, suit)

            this.slideFromTo(cardElement, this.deckGraphic, handDisplay)
            this.cardsDealt++
        });

    }

    updateScore() {
        // TODO: Get the sums from each hand and append it to the dom in the appropriate plave
    }

    async update(timestamp) {
        // If something is still animating wait and check again in 10ms
        while (this.active) {
            await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // IF 52 cards have been dealt do the shuffle animation and reset the dealt cards counter
        if (this.cardsDealt > 51) {
            this.animateShuffle()
            this.cardsDealt = 0;
        }

        // Update both Tables
        this.updateTable(this.dealerHand, this.dealerBoardDisplay)
        this.updateTable(this.playerHand, this.playerBoardDisplay)

        requestAnimationFrame(this.update)
    }

    start() {
        requestAnimationFrame(this.update)
    }
}

const ui = new UI;
ui.setup(document.querySelector("#player"), document.querySelector("#dealer"), document.querySelector("#deck"))

const playerBoard = []
const dealerBoard = []
const theDeck = []

for (let i = 0; i < 4; i++) {
    const card0 = {
        value: i,
        suit: i
    }
    dealerBoard.push(card0)
}

ui.init(playerBoard, dealerBoard, theDeck)
ui.start()