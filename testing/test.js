document.addEventListener(`DOMContentLoaded`, function () {
    let gameMode = undefined;

    let gameModeSelectScreen = document.getElementById('gameModeSelect');
    let playerButton = document.getElementById('playerButton');
    let computerButton = document.getElementById('computerButton');
    playerButton.addEventListener('click', function () {
        gameMode = "player";
        gameModeSelectScreen.classList.add("hidden");
        shipSelectionScreen.classList.remove("hidden");
    });
    computerButton.addEventListener('click', function () {
        gameMode = "computer";
        gameModeSelectScreen.classList.add("hidden");
        shipSelectionScreen.classList.remove("hidden");
    });

    let shipSelectionScreen = document.getElementById('shipSelection');
    let shipSelectionContinueButton = document.getElementById("shipSelectionContinueButton");
    shipSelectionContinueButton.addEventListener('click', function () {
        shipSelectionScreen.classList.add("hidden");
        gameplayScreen.classList.remove("hidden");
    });

    let gameplayScreen = document.getElementById('gameScreen');

    let instructionsButtons = document.querySelectorAll('instructionsButton');
    let instructionsOverlay = document.querySelectorAll('instructionsOverlay');
    let closeInstructionsOverlayButtons = document.querySelectorAll('closeInstructionsOverlay');
    for (button of instructionsButtons) {
        button.addEventListener('click', function () {
            for (overlay of instructionsOverlay) {
                overlay.classList.remove('hidden');
            }
        });
    }
    for (button of closeInstructionsOverlayButtons) {
        button.addEventListener('click', function () {
            for (overlay of instructionsOverlay) {
                overlay.classList.add('hidden');
            }
        });
    }



    let gameBoardOverlay = document.getElementById('gameBoardOverlayPlayerOne');
    let gameBoard = new Map();
    // 2 for loops to create a 2d array for the OVERLAY board as well as create a map for the actual GAME baord
    for (rows = 20; rows > 0; rows--) {
        for (columns = 1; columns < 21; columns++) {
            // Creates button elements with unique coordinate id's, hit detection, as children of overlay
            let sqrID = `x${columns}y${rows}`;
            let newSquare = document.createElement("button");
            newSquare.setAttribute("id", sqrID);
            newSquare.classList.add("squares");
            // when square clicked
            newSquare.addEventListener("click", function () {
                // Gets coordinates of clicked square
                let clickedSqrID = this.getAttribute("id");
                console.log(clickedSqrID)
                selectedCoordinate(clickedSqrID);

            });
            gameBoardOverlay.appendChild(newSquare);
            //Creates a map for gameboard squares 
            gameBoard.set(`${sqrID}`, {});
        }
    }

    // Check if coordinate hits any ship
    function selectedCoordinate(coordinate) {
        let splitID = coordinate.match(/\d+/g);
        let sqrXCoord = null;
        let sqrYCoord = null;
        for (let char of splitID) {
            let num = Number(char);
            if (sqrXCoord == null) {
                sqrXCoord = num;
            }
            else if (sqrXCoord != null) {
                sqrYCoord = num;
            }
        }
        // Sees if ship is on that coordinate
        for (let ship of shipList) {
            if (ship.rotation == "horizontal" && ship.yCoord == sqrYCoord) {
                if (sqrXCoord <= ship.xCoord && sqrXCoord > ship.xCoord - ship.size) {
                    ship.health--;
                    console.log(`hit ${ship.name} at ${coordinate}`);
                }
            }
            else if (ship.rotation == "vertical" && ship.xCoord == sqrXCoord) {
                if (sqrYCoord <= ship.yCoord && sqrYCoord > ship.yCoord - ship.size) {
                    ship.health--;
                    console.log(`hit ${ship.name} at ${coordinate}`);
                }
            }
        }
    }

    class AircraftCarrier {
        constructor() {
            this.name = "AircraftCarrier";
            this.size = 5;
            this.health = 6;
            this.speed = 1;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = "horizontal";
        }
    }
    class Destroyer {
        constructor() {
            this.name = "Destroyer";
            this.size = 4;
            this.speed = 2;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = "vertical";
        }
    }
    let shipList = [new AircraftCarrier(), new Destroyer()];

    // generates random number 1 - 20
    function rng() {
        let rng = Math.floor((Math.random() * 20) + 1);
        return rng;
    }

    function hitCoordinate(coordinate) {
        let splitID = coordinate.match(/\d+/g);
        let sqrXCoord = null;
        let sqrYCoord = null;
        for (let char of splitID) {
            let num = Number(char);
            if (sqrXCoord == null) {
                sqrXCoord = num;
            }
            else if (sqrXCoord != null) {
                sqrYCoord = num;
            }
        }
        // Sees if ship is on that coordinate
        for (let ship of shipList) {
            if (ship.rotation == "horizontal" && ship.yCoord == sqrYCoord) {
                if (sqrXCoord <= ship.xCoord && sqrXCoord > ship.xCoord - ship.size) {
                    console.log(`hit ${ship.name} at ${coordinate}`);
                }
            }
            else if (ship.rotation == "vertical" && ship.xCoord == sqrXCoord) {
                if (sqrYCoord <= ship.yCoord && sqrYCoord > ship.yCoord - ship.size) {
                    console.log(`hit ${ship.name} at ${coordinate}`);
                }
            }
        }
    }

    // Generates a random coordinate for the ship, makes sure ship does not escape grid
    function randomCoord(inputShip) {
        if (inputShip.rotation == "horizontal") {
            inputShip.xCoord = rng();
            while (inputShip.xCoord < inputShip.size) {
                inputShip.xCoord = rng();
            }
            inputShip.yCoord = rng();
        }
        else if (inputShip.rotation == "vertical") {
            inputShip.yCoord = rng();
            while (inputShip.yCoord < inputShip.size) {
                inputShip.yCoord = rng();
            }
            inputShip.xCoord = rng();
        }
    }
    // returns true if no Coordinates overlap, false if any Coordinates do
    function checkCoordValidity() {
        let allOccupiedSquares = [];
        // for loop pushes coordinates for all squares covered by each ship to the allOccupiedSquares array, unless coordinate values undefined
        for (let ship of shipList) {
            if (ship.rotation == "horizontal" && typeof ship.xCoord == "number" && typeof ship.yCoord == "number") {
                for (let i = 0; i < ship.size; i++) {
                    allOccupiedSquares.push(`x${ship.xCoord + i}y${ship.yCoord}`);
                }
            }
            else if (ship.rotation == "vertical" && typeof ship.xCoord == "number" && typeof ship.yCoord == "number") {
                for (let i = 0; i < ship.size; i++) {
                    allOccupiedSquares.push(`x${ship.xCoord}y${ship.yCoord + i}`);
                }
            }
        }
        // a "Set" is a collection of unique values. Any duplicate coordinates from the array will be removed, so if the lengths are not the same there was overlap
        return new Set(allOccupiedSquares).size === allOccupiedSquares.length;
    }

    // generates random coords for all ships, making sure sure there are no duplicates
    function randomCoordinatesAllShips() {
        for (let ship of shipList) {
            randomCoord(ship);
            while (checkCoordValidity() == false) {
                randomCoord(ship);
            }
        }
    }
    randomCoordinatesAllShips();

    function moveShips() {
        for (ship of shipList) {
            let randomNum = Math.random();
            // 50% chance to rotate
            if (randomNum < 0.5) {
                // wont do the rotate if it messed up coordinate validity, otherwise will change rotation
                if (ship.rotation == "horizontal") {
                    ship.rotation == "vertical";
                    checkCoordValidity() ? ship.rotation = "vertical" : ship.rotation = "horizontal";
                }
                else if (ship.rotation == "vertical") {
                    ship.rotation == "horizontal";
                    checkCoordValidity() ? ship.rotation = "horizontal" : ship.rotation = "vertical";
                }
            }
            // 50% chance to move
            else {
                // wont move if it messed up coordinate validity. Can move the amount of squares equivalent to or less than ship.speed value in its rotations direction
                let shipMovementRange = Math.floor(Math.random() * (ship.speed - (ship.speed * -1) + 1)) + (ship.speed * -1);
                let prevXCoord = ship.xCoord;
                let prevYCoord = ship.yCoord;
                if (ship.rotation == "horizontal") {
                    ship.xCoord += shipMovementRange;
                }
                else if (ship.rotation == "vertical") {
                    ship.yCoord += shipMovementRange;
                }
                if (checkCoordValidity() == false || ship.xCoord < ship.size || ship.yCoord < ship.size || ship.xCoord > 20 || ship.yCoord > 20) {
                    ship.xCoord = prevXCoord;
                    ship.yCoord = prevYCoord;
                }
            }
        }
    }
    moveShips();

    for (s of shipList) {
        console.log(s)
    }
});
