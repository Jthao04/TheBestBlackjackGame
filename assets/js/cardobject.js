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