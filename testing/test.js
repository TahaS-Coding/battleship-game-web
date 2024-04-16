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

    // This is the one
    gameplayScreen.classList.remove("hidden");

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


            // When square on grid is clicked check if it hit any ship
            newSquare.addEventListener("click", function () {
                // Gets coordinates of clicked square
                let clickedSqrID = this.getAttribute("id");
                let abilityActive = whichAbility();
                if (abilityActive[0] === true) {
                    let arrayOfCoordinates = abilities(clickedSqrID, abilityActive[1]);
                    for (coord of arrayOfCoordinates) {
                        hitCoordinate(coord);
                    };

                } else {
                    console.log(hitCoordinate(clickedSqrID))
                    hitCoordinate(clickedSqrID);
                }
            });
            gameBoardOverlay.appendChild(newSquare);
            //Creates a map for gameboard squares 
            gameBoard.set(`${sqrID}`, {});
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

        let scout = document.getElementById(`Scout`);
        if (scout.name === `on`) {
            respond();
        } else {
            // Sees if ship is on that coordinate
            for (let ship of shipList) {
                if (ship.rotation == "horizontal" && ship.yCoord == sqrYCoord) {
                    if (sqrXCoord <= ship.xCoord && sqrXCoord > ship.xCoord - ship.size) {
                        respond(ship.name, coordinate);
                    }
                }
                else if (ship.rotation == "vertical" && ship.xCoord == sqrXCoord) {
                    if (sqrYCoord <= ship.yCoord && sqrYCoord > ship.yCoord - ship.size) {
                        respond(ship.name, coordinate);
                    }
                } else {
                    respond();
                }
            }
        }
    }

    // Changes output based on what happen (i.e., abilities)
    // add a else if for abilities
    function respond(shipName, coordinate) {
        // Scout is an ability that locates the position of a random ship
        let scout = document.getElementById(`Scout`);
        if (scout.name === `on`) {
            let number = (Math.floor(Math.random() * shipList.length))
            let foundShip = shipList[number];
            console.log(`${foundShip.name} located at x${foundShip.xCoord}y${foundShip.yCoord}`)
            return `${foundShip.name} located at x${foundShip.xCoord}y${foundShip.yCoord}`;
        } else {
            if (shipName === undefined) {
                return `Nothing hit`;
            } else {
                ship.health--;
                console.log(`hit ${shipName} at ${coordinate}`);
                return (`hit ${shipName} at ${coordinate}`);
            }
        }
    }

    function whichAbility() {
        for (abilityID of abilitiesList) {
            let shipAbility = document.getElementById(`${abilityID}`)
            if (shipAbility.name === `on`) {
                return [true, abilityID];
            }
        }
        return [false];
    }


    class AircraftCarrier {
        constructor() {
            this.name = "AircraftCarrier";
            this.size = 5;
            this.health = 6;
            this.speed = 1;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.abilityName = `Airplane`;
        }
    }
    class Destroyer {
        constructor() {
            this.name = "Destroyer";
            this.size = 4;
            this.health = 6;
            this.speed = 2;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.abilityName = `Torpedo`;
        }
    }
    class Cruiser {
        constructor() {
            this.name = "Cruiser";
            this.size = 5;
            this.health = 6;
            this.speed = 1;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.abilityName = `Missile`;
        }
    }
    class Battleship {
        constructor() {
            this.name = "Battleship";
            this.size = 4;
            this.health = 6;
            this.speed = 2;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.abilityName = `Bombardment`;
        }
    }
    class Frigate {
        constructor() {
            this.name = "Frigate";
            this.size = 4;
            this.health = 6;
            this.speed = 2;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.abilityName = `Scout`;
        }
    }
    let shipList = [new AircraftCarrier(), new Destroyer(), new Cruiser(), new Battleship(), new Frigate()];
    let abilitiesList = [];
    // Creates buttons for the ability
    // It also turn the ability on and off based on click
    function createButtons() {
        let abilityList = document.getElementById('abilityList');
        let cancelButton = document.createElement(`button`);
        cancelButton.setAttribute("id", "cancel");
        cancelButton.innerHTML = `Cancel`;
        for (ship of shipList) {
            let abilityName = ship.abilityName;
            abilitiesList.push(abilityName);
            let abilityButton = document.createElement("button");
            abilityButton.setAttribute("id", abilityName);
            abilityButton.setAttribute("name", `off`);
            abilityButton.classList.add("ability");
            abilityButton.innerHTML = abilityName;
            abilityList.appendChild(abilityButton);
            // Which ever ability gets click, the name will change to on
            // This will determine which ability is being used
            abilityButton.addEventListener(`click`, function () {
                // Set the name to off for all the buttons
                // This prevents having multiple abilities being actives
                for (ship of shipList) {
                    let abilityId = ship.abilityName;
                    let abilityBttn = document.getElementById(`${abilityId}`)
                    abilityBttn.setAttribute("name", "off")
                }
                abilityButton.setAttribute("name", "on");
            })
        };
        abilityList.appendChild(cancelButton);
        cancelButton.addEventListener(`click`, function () {
            for (ship of shipList) {
                let abilityId = ship.abilityName;
                let abilityBttn = document.getElementById(`${abilityId}`)
                abilityBttn.setAttribute("name", "off")
            }
        })

        console.log(abilitiesList)
    }
    createButtons()

    // Generate coordinates for the ability 
    function abilities(coordinate, abilityName) {
        // Splits coordianate into x and y
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
        let coordinatesArray = [];
        switch (abilityName) {
            case `Airplane`:
                for (let i = 0; i < 3; i++) {
                    sqrXCoord += i;
                    for (let i = 0; i < 3; i++) {
                        coordinatesArray.push(`x${sqrXCoord}y${sqrYCoord + (i)}`)
                    }
                };
                break;
            case `Torpedo`:
                for (let i = 0; i < 5; i++) {
                    coordinatesArray.push(`x${sqrXCoord}y${sqrYCoord + i}`)
                };
                break;
            case `Scout`:
                coordinatesArray.push(`x${0}y${0}`)
                break;
            case `Missile`:
                for (let i = 0; i < 2; i++) {
                    sqrXCoord += i;
                    for (let i = 0; i < 2; i++) {
                        coordinatesArray.push(`x${sqrXCoord}y${sqrYCoord + (i)}`)
                    }
                };
                break;
            case `Bombardment`:
                for (let i = 0; i < 5; i++) {
                    sqrXCoord += i;
                    for (let i = 0; i < 3; i++) {
                        coordinatesArray.push(`x${sqrXCoord}y${sqrYCoord + (i)}`)
                    }
                };
                break;
        }
        return coordinatesArray;
    }

    // generates random number 1 - 20
    function rng() {
        let rng = Math.floor((Math.random() * 20) + 1);
        return rng;
    }



    // Generates a random coordinate for the ship, makes sure ship does not escape grid
    function randomCoord(inputShip) {
        // Ship rotation is undefined, so this will define it
        if (rng >= 10) {
            inputShip.rotation = `horizontal`;
        } else {
            inputShip.rotation = `vertical`
        }
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
                // Won't move if it messed up coordinate validity. Can move the amount of squares equivalent to or less than ship.speed value in its rotations direction
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

});
