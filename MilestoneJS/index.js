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

window.onload = function () {
    setGame();
}

function setGame() {
    // for loop to load 1-9 instead of having it based in html
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }


    //board grid
    // r = row c = coulum
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            // "-" each is being loaded as Row - column to create each square
            tile.id = r.toString() + "-" + c.toString();
            // loading inner text and leaving blank where "-" is found
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            // checks for Row and coulmn to add darker line
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

// TODO: add effects to board when the same number Selected
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected")
}

function selectTile() {
    if (numSelected) {
        // prevents overiding numbers by checking inner text value
        if (this.innerText != "") {
            return;
        }

        // using coords to locate the value of the solution
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            error += 1;
            document.getElementById("error").innerText = error;
        }

    }
}
