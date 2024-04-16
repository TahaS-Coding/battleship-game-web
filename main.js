document.addEventListener(`DOMContentLoaded`, function () {
    // global variables
    let gameMode = undefined;
    let playerOneShipsSelected = false;
    let playerTwoShipsSelected = false;
    let selectingPlayerTwoShips = false;
    let playerOneShipList = [];
    let playerTwoShipList = [];
    let computerShipList = [];
    let player = "p1";

    // game mode select screen
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

    // ship select screen
    let shipSelectionScreen = document.getElementById('shipSelection');
    let shipSelectionContinueButton = document.getElementById("shipSelectionContinueButton");
    let chosenShips = document.getElementById("chosenShips");
    let addCarrierButton = document.getElementById("addCarrier");
    let addDestroyerButton = document.getElementById("addDestroyer");
    let addCruiserButton = document.getElementById("addCruiser");
    let addBattleshipButton = document.getElementById("addBattleship");
    let addFrigateButton = document.getElementById("addFrigate");
    let shipAddButtons = [addCarrierButton, addDestroyerButton, addCruiserButton, addBattleshipButton, addFrigateButton];
    for (button of shipAddButtons) {
        button.addEventListener('click', function (e) {
            // what type of ship to add to game code and html
            let ship;
            let shipElement = document.createElement("section");
            let shipNameHeading = document.createElement("h4");
            let shipRemoveButton = document.createElement("button");
            shipRemoveButton.innerText = "-";

            if (e.target.id == "addCarrier") {
                ship = new AircraftCarrier();
                shipNameHeading.innerText = "Aircraft Carrier";
            }
            else if (e.target.id == "addDestroyer") {
                ship = new Destroyer();
                shipNameHeading.innerText = "Destroyer";
            }
            else if (e.target.id == "addCruiser") {
                ship = new Cruiser();
                shipNameHeading.innerText = "Cruiser";
            }
            else if (e.target.id == "addBattleship") {
                ship = new Battleship();
                shipNameHeading.innerText = "Battleship";
            }
            else if (e.target.id == "addFrigate") {
                ship = new Frigate();
                shipNameHeading.innerText = "Frigate";
            }
            shipRemoveButton.addEventListener('click', function () {
                if (selectingPlayerTwoShips == false) {
                    playerOneShipList.splice(playerOneShipList.indexOf(ship), 1);
                    console.log(playerOneShipList);
                    playerOneShipsSelected = false;
                }
                else {
                    playerTwoShipList.splice(playerTwoShipList.indexOf(ship), 1);
                    playerTwoShipsSelected = false;
                }
                shipElement.remove();
            });
            shipElement.appendChild(shipNameHeading);
            shipElement.appendChild(shipRemoveButton);

            // computer opponent
            if (gameMode == "computer" && playerOneShipsSelected == false) {
                playerOneShipList.push(ship);
                chosenShips.appendChild(shipElement);
                if (playerOneShipList.length == 5) {
                    playerOneShipsSelected = true;
                }
            }
            else if (gameMode == "computer" && playerOneShipsSelected == true) {
                alert("ships full");
            }
            // player vs player
            if (gameMode == "player" && playerOneShipsSelected == false) {
                playerOneShipList.push(ship);
                chosenShips.appendChild(shipElement);
                if (playerOneShipList.length == 5) {
                    playerOneShipsSelected = true;
                }
            }
            else if (gameMode == "player" && playerOneShipsSelected == true && selectingPlayerTwoShips == false) {
                alert("ships full");
            }
            else if (gameMode == "player" && playerTwoShipsSelected == false) {
                playerTwoShipList.push(ship);
                chosenShips.appendChild(shipElement);
                if (playerTwoShipList.length == 5) {
                    playerTwoShipsSelected = true;
                }
            }
            else if (gameMode == "player" && playerTwoShipsSelected == true) {
                alert("ships full");
            }
        });
    }
    shipSelectionContinueButton.addEventListener('click', function () {
        // computer opponent
        if (gameMode == "computer" && playerOneShipsSelected == true) {
            shipSelectionScreen.classList.add("hidden");
            gameplayScreen.classList.remove("hidden");
            createOverlays();
            randomCoordinatesAllShips(playerOneShipList);
            randomCoordinatesAllShips(computerShipList);
        }
        else if (gameMode == "computer" && playerOneShipsSelected == false) {
            alert("choose 5 ships");
        }
        //player vs player
        if (gameMode == "player" && playerOneShipsSelected == true && selectingPlayerTwoShips == false) {
            chosenShips.innerHTML = "";
            selectingPlayerTwoShips = true;
        }
        else if (gameMode == "player" && playerOneShipsSelected == false) {
            alert("choose 5 ships");
        }
        else if (gameMode == "player" && playerTwoShipsSelected == true) {
            shipSelectionScreen.classList.add("hidden");
            gameplayScreen.classList.remove("hidden");
            createOverlays();
            randomCoordinatesAllShips(playerOneShipList);
            randomCoordinatesAllShips(playerTwoShipList);
        }
        else if (gameMode == "player" && playerTwoShipsSelected == false) {
            alert("choose 5 ships");
        }
    });

    // gameplay screen
    let gameplayScreen = document.getElementById('gameScreen');
    let playerOneOverlayBoard = document.getElementById("gameBoardOverlayPlayerOne");
    let playerTwoOverlayBoard = document.getElementById("gameBoardOverlayPlayerTwo");

    // instructions overlay
    let instructionsButtons = document.querySelectorAll('.instructionsButton');
    let instructionsOverlay = document.querySelectorAll('.instructionsOverlay');
    let closeInstructionsOverlayButtons = document.querySelectorAll('.closeInstructionsOverlay');
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




    // 2 for loops to create a 2d array for the overlay board(s)
    function createOverlays() {
        for (rows = 13; rows > 0; rows--) {
            for (columns = 1; columns < 14; columns++) {
                // Creates button elements with unique coordinate id's, hit detection, as children of overlay
                let sqrID = `x${columns}y${rows}`;
                let newSquare = document.createElement("button");
                newSquare.setAttribute("id", sqrID);
                newSquare.classList.add("squares");
                let newSquareClone = newSquare.cloneNode(true);
                // when square clicked
                newSquare.addEventListener("click", function () {
                    // Gets coordinates of clicked square
                    let clickedSqrID = this.getAttribute("id");
                    hitCoordinate(clickedSqrID);
                    //change player turn
                    if (gameMode == "player") {
                        playerOneOverlayBoard.classList.add("hidden");
                        moveShips(playerOneShipList);
                        playerTwoOverlayBoard.classList.remove("hidden");
                        player = "p2";
                    }
                    else if (gameMode == "computer") {
                        computerStuff();
                    }

                });
                newSquareClone.addEventListener("click", function () {
                    // Gets coordinates of clicked square
                    let clickedSqrID = this.getAttribute("id");
                    hitCoordinate(clickedSqrID);
                    //change player turn
                    if (gameMode == "player") {
                        playerTwoOverlayBoard.classList.add("hidden");
                        moveShips(playerTwoShipList);
                        playerOneOverlayBoard.classList.remove("hidden");
                        player = "p1";
                    }
                });

                if (gameMode == "player") {
                    playerOneOverlayBoard.appendChild(newSquare);
                    playerTwoOverlayBoard.appendChild(newSquareClone);
                }
                else {
                    playerOneOverlayBoard.appendChild(newSquare);
                }
            }
        }
    }
    // Check if coordinate hits any ship
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
        // Sees if ship is on that coordinate (based on whos grid is being attacked)
        let shipList;
        if (gameMode == "player") {
            if (player = "p1") {
                shipList = playerTwoShipList;
            }
            else {
                shipList = playerOneShipList;
            }
        }
        else if (gameMode == "computer") {
            if (player = "p1") {
                shipList = computerShipList;
            }
            else {
                shipList = playerOneShipList;
            }
        }
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
    function computerStuff() {

    }


    class AircraftCarrier {
        constructor() {
            this.name = "AircraftCarrier";
            this.size = 5;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.speed = 1;
        }
    }
    class Destroyer {
        constructor() {
            this.name = "Destroyer";
            this.size = 4;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.speed = 2;
        }
    }
    class Cruiser {
        constructor() {
            this.name = "Cruiser";
            this.size = 5;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.speed = 1;
        }
    }
    class Battleship {
        constructor() {
            this.name = "Battleship";
            this.size = 4;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.speed = 2;
        }
    }
    class Frigate {
        constructor() {
            this.name = "Frigate";
            this.size = 4;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.speed = 2;
        }
    }

    // generates random number 1 - 13
    function rng() {
        let rng = Math.floor((Math.random() * 13) + 1);
        return rng;
    }


    // Generates a random coordinate and rotation for the ship, makes sure ship does not escape grid
    function randomCoord(inputShip) {
        // random rotation
        let randomNum = Math.random();
        if (randomNum < 0.5) {
            inputShip.rotation = "horizontal";
        }
        else {
            inputShip.rotation = "vertical";
        }
        // random coord
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
    function checkCoordValidity(shipList) {
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
    function randomCoordinatesAllShips(shipList) {
        for (let ship of shipList) {
            randomCoord(ship);
            while (checkCoordValidity(shipList) == false) {
                randomCoord(ship);
            }
        }
    }

    function moveShips(shipList) {
        for (ship of shipList) {
            let randomNum = Math.random();
            // 50% chance to rotate
            if (randomNum < 0.5) {
                // wont do the rotate if it messed up coordinate validity, otherwise will change rotation
                if (ship.rotation == "horizontal") {
                    ship.rotation == "vertical";
                    checkCoordValidity(shipList) ? ship.rotation = "vertical" : ship.rotation = "horizontal";
                }
                else if (ship.rotation == "vertical") {
                    ship.rotation == "horizontal";
                    checkCoordValidity(shipList) ? ship.rotation = "horizontal" : ship.rotation = "vertical";
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
                if (checkCoordValidity(shipList) == false || ship.xCoord < ship.size || ship.yCoord < ship.size || ship.xCoord > 13 || ship.yCoord > 13) {
                    ship.xCoord = prevXCoord;
                    ship.yCoord = prevYCoord;
                }
            }
        }
    }


});
