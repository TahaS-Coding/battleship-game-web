// Random number generator
function rng() {
    let rng = Math.floor((Math.random() * 20) + 1);
    // Generates a number 1 - 20  
    // The 20 makes it generate a number less than 20
    // It actually generating a 0 - 19, so adding 1 solves the problem
    return (rng);
}

let shipCoordinate = [];
// Keeps track of coordinate that have already been taken
// Use this to check if ship is hit
// Maybe we are going to need two for each player
let shipHit = [];
// Keeps track ships hit


// This is going to be used to create new ship
class Ship {
    constructor(name, health, length, speed) {
        this.name = name;
        this.health = health;
        this.length = length;
        this.movementSpeed = speed;
        this.direction = generateDirection();
        this.orientation = ori(this.direction);
        this.coordinate = [];
    }
}


// Create new following the instruction
// name, health, length, movement speed
let battleship = new Ship(`Battleship`, 8, 8, 3);
let cruiser = new Ship(`Cruiser`, 5, 6, 5);
// console.log(battleship, cruiser)
let shipLists = [battleship, cruiser]



// console.log(battleship.health -= 1)
// console.log(battleship)


// This function uses the number generator to decide what direction the ships is going
// Going to need to check if direction is available
function generateDirection() {
    let d = rng();
    if (d <= 5) {
        return `up`;
    } else if (d <= 10) {
        return `down`;
    } else if (d <= 15) {
        return `left`;
    } else {
        return `right`;
    }
}

// Determines the ship orientation
// up and down = vertical
// left and right = horizontal
// I forgot why I made this
function ori(d) {
    switch (d) {
        case (`left`):
            // console.log(`horizontal`)
            return `horizontal`;
        case (`right`):
            // console.log(`horizontal`)
            return `horizontal`;
        case (`up`):
            // console.log(`vertical`)
            return `vertical`;
        case (`down`):
            // console.log(`vertical`)
            return `vertical`;
    }
}


// Add x or y
// function Add(name, length, axis, xy) {
//     let i = 0;
//     do {
//         i++;
//         axis++;
//         let result = `x${axis}y${xy}`;
//         shipCoordinate.push(result);
//         name.coordinate.push(result)
//     } while (i < length);
// }
// // Subtract x or y  
// function Sub(name, length, axis, xy) {
//     let i = 0;
//     do {
//         i++;
//         axis--;
//         let result = `x${axis}y${xy}`;
//         shipCoordinate.push(result);
//         name.coordinate.push(result)
//     } while (i < length);
// }
// console.log(shipCoordinate)


function moveAxis(name, dir, length, x, y) {


    switch (dir) {
        case (`left`):
            // Sub(name, length, x, y)
            break;
        case (`right`):
            // Add(name, length, x, y)
            break;
        case (`up`):
            // Add(name, length, y, x)
            break;
        case (`down`):
            // Sub(name, length, y, x)
            break;
    }
}

function generateCoordinate(n, c, l, d) {
    // n is ship name
    // c is the coordinate
    // l is the length of the ship
    // d is the direction
    let x = rng()
    let y = rng()
    moveAxis(n, d, l, x, y)
    let result = `x${x}y${y}`;
    c.push(result)
    shipCoordinate.push(result);
    // console.log(result)
    return result;
}

// let bc = (battleship.coordinate)
// bc.push(generateCoordinate())

// console.log(battleship.coordinate)
function coordinate() {
    shipLists.forEach((element) => {
        let length = element.length;
        let direction = element.direction;
        let coordinate = element.coordinate;
        if (coordinate.length === 0) {
            generateCoordinate(element, coordinate, length, direction)
            // console.log(shipCoordinate)
        }
        coordinate.forEach((element) => {
            let result = shipCoordinate.indexOf(element);
            shipHit.push(result);
            // console.log(result)
        })
        // console.log(shipHit, length);




    });
}
coordinate()
// this function is going to be called at the start of the game and every round
// the direction function is also going to be called every round



// how am I going to have these code run for each player
// we are going to figure this out later, first get these code to work
// grab old coord and create new coord
// use direction() to choose direction of movement
// check if coord is valid, if not get new direction
// randomize the amount of square moved  


class AircraftCarrier {
    constructor() {
        this.name = "AircraftCarrier";
        this.size = 5;
        this.xCoord = 12;
        this.yCoord = 13;
        // this.direction = generateDirection();
        this.rotation = `horizontal`;
        this.occupiedSquares = undefined;
    }
}
class Destroyer {
    constructor() {
        this.name = "Destroyer";
        this.size = 4;
        this.xCoord = 11;
        this.yCoord = 15;
        // this.direction = generateDirection();
        this.rotation = `vertical`;
        this.occupiedSquares = undefined;
    }
}
let shipList = [new AircraftCarrier(), new Destroyer()];


function checkCoord() {
    let notAvailable = [];
    for (let ship of shipList) {
        // randomCoords(ship)
        let checking = [];
        let name = ship.name;
        let xAxis = ship.xCoord;
        let yAxis = ship.yCoord;
        let size = ship.size;
        let rotation = ship.rotation;
        if (rotation == `horizontal`) {
            let coordinateList = Sub(size, xAxis, yAxis, `x`);
            for (let coord of coordinateList) {
                checking.push(coord);
            }
        } else if (rotation == `vertical`) {
            let coordinateList = Sub(size, yAxis, xAxis, `y`);
            for (let coord of coordinateList) {
                checking.push(coord);
            }
        }
        console.log(name, xAxis, yAxis, rotation, size)
        console.log(checking)
        let checked = `undefined`;
        for (let coord of checking) {
            let c = notAvailable.indexOf(coord)
            if (c >= 0) {
                checked = `Not Available`;
                break;
            } else {
                checked = `true`;
            }
        }
        console.log(checked)
        if (checked === `true`) {
            for (let coord of checking) {
                notAvailable.push(coord);
            }
        } else if (checked === `Not Available`) {
        }

    }
    console.log(notAvailable)
}
checkCoord()
function randomCoords(inputShip) {
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

// Subtract x or y  
function Sub(length, axis, otherAxis, xy) {
    axis++;
    // This axis++ makes sure that it starts at the right axis
    let i = 0;
    let result = [];
    while (i < length) {
        i++;
        axis--;
        if (xy == `x`) {
            result.push(`x${axis}y${otherAxis}`);
        } else if (xy == `y`) {
            result.push(`x${otherAxis}y${axis}`);
        }
    };
    return result;
}



