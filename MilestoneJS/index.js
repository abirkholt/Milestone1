var numSelected = null;
var tileSelected = null;

var error = 0;


// starting board to load in
var board = [
    "-5-314-6-",
    "87---94-3",
    "6435-7192",
    "--78-521-",
    "41-9-----",
    "-25-619-7",
    "79-25-84-",
    "--4-96--5",
    "-3-1-867-",
]

// the board compared to during game
var solution = [
    "259314768",
    "871629453",
    "643587192",
    "967835214",
    "418972536",
    "325461987",
    "796253841",
    "184796325",
    "532148679",
]

window.onload = function() {
    setGame();
}

function setGame() {
    // for loop to load 1-9 instead of having it based in html
    for (let i = 1; i<=9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }


    //board grid
    // r = row c = coulum
    for (let r = 0; r <9; r++) {
        for (let c=0; c < 9; c++) {
            let tile = document.createElement("div");
            // "-" each is being loaded as Row - column to create each square
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

