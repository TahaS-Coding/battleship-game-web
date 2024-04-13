// class AircraftCarrier {
//     constructor() {
//         this.name = "AircraftCarrier";
//         this.size = 5;
//         this.xCoord = undefined;
//         this.yCoord = undefined;
//         this.rotation = "horizontal";
//         this.abilityName = `Airplane`;
//     }
// }
// class Destroyer {
//     constructor() {
//         this.name = "Destroyer";
//         this.size = 4;
//         this.xCoord = undefined;
//         this.yCoord = undefined;
//         this.rotation = "vertical";
//         this.abilityName = `Torpedo`;
//     }
// }
// let shipList = [new AircraftCarrier(), new Destroyer()];


// generates random number 1 - 20
function rng() {
    let rng = Math.floor((Math.random() * 20) + 1);
    return rng;
}

// function createButtons() {
//     let abilityList = document.getElementById('abilityList');
//     console.log(abilityList)

//     for (ship of shipList) {
//         let abilityName = ship.abilityName;
//         let abilityButton = document.createElement("button");
//         abilityButton.setAttribute("id", abilityName);
//         abilityButton.classList.add("ability");
//         abilityButton.innerHTML = abilityName;
//         abilityList.appendChild(abilityButton);
//     };
// }
// createButtons()

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
            console.log("found false");
        }
        console.log(`x${ship.xCoord}y${ship.yCoord} for ${ship.name}`);
    }
}
randomCoordinatesAllShips();

function moveShips() {
    for (ship of shipList) {
        let randomNum = Math.random();
        // 50% chance to rotate
        if (randomNum < 0.5) {
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
            let shipMovementRange = Math.floor(Math.random() * (ship.speed - (ship.speed * -1) + 1)) + (ship.speed * -1);
            let prevXCoord = ship.xCoord;
            let prevYCoord = ship.yCoord;
            if (ship.rotation == "horizontal") {
                ship.xCoord += shipMovementRange;
            }
            else if (ship.rotation == "vertical") {
                ship.yCoord += shipMovementRange;
            }
            checkCoordValidity() ? ship.rotation = "horizontal" : ship.rotation = "vertical";
        }
    }
}


class AircraftCarrier {
    constructor() {
        this.name = "AircraftCarrier";
        this.size = 5;
        this.xCoord = 12;
        this.yCoord = 5;
        this.rotation = "horizontal";
        this.abilityName = `Airplane`;
    }
}
class Destroyer {
    constructor() {
        this.name = "Destroyer";
        this.size = 4;
        this.xCoord = 12;
        this.yCoord = 5;
        this.rotation = "vertical";
        this.abilityName = `Torpedo`;
    }
}
let shipList = [new AircraftCarrier(), new Destroyer()];

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
hitCoordinate(`x12y5`)

// create array of squareId clicked
// run it through shipCoord.indexOf
// make a code that create an array for ship coords