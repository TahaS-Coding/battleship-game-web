// // Random number generator
// function rng() {
//     let rng = Math.floor((Math.random() * 20) + 1);
//     // Generates a number 1 - 20  
//     // The 20 makes it generate a number less than 20
//     // It actually generating a 0 - 19, so adding 1 solves the problem
//     return (rng);
// }

// let shipCoordinate = [];
// // Keeps track of coordinate that have already been taken
// // Use this to check if ship is hit
// // Maybe we are going to need two for each player
// let shipHit = [];
// // Keeps track ships hit


// // This is going to be used to create new ship
// // class Ship {
// //     constructor(name, health, length, speed) {
// //         this.name = name;
// //         this.health = health;
// //         this.length = length;
// //         this.movementSpeed = speed;
// //         this.direction = generateDirection();

// //         this.coordinate = [];
// //     }
// // }


// // Create new following the instruction
// // name, health, length, movement speed
// // let battleship = new Ship(`Battleship`, 8, 8, 3);
// // let cruiser = new Ship(`Cruiser`, 5, 6, 5);
// // console.log(battleship, cruiser)
// let shipLists = [battleship, cruiser]



// // console.log(battleship.health -= 1)
// // console.log(battleship)


// // This function uses the number generator to decide what direction the ships is going
// // Going to need to check if direction is available
// function generateDirection() {
//     let d = rng();
//     if (d <= 5) {
//         return `up`;
//     } else if (d <= 10) {
//         return `down`;
//     } else if (d <= 15) {
//         return `left`;
//     } else {
//         return `right`;
//     }
// }

// // Determines the ship orientation
// // up and down = vertical
// // left and right = horizontal
// // I forgot why I made this
// // function ori(d) {
// //     switch (d) {
// //         case (`left`):
// //             // console.log(`horizontal`)
// //             return `horizontal`;
// //         case (`right`):
// //             // console.log(`horizontal`)
// //             return `horizontal`;
// //         case (`up`):
// //             // console.log(`vertical`)
// //             return `vertical`;
// //         case (`down`):
// //             // console.log(`vertical`)
// //             return `vertical`;
// //     }
// // }


// // Add x or y
// // function Add(name, length, axis, xy) {
// //     let i = 0;
// //     do {
// //         i++;
// //         axis++;
// //         let result = `x${axis}y${xy}`;
// //         shipCoordinate.push(result);
// //         name.coordinate.push(result)
// //     } while (i < length);
// // }
// // // Subtract x or y  
// // function Sub(name, length, axis, xy) {
// //     let i = 0;
// //     do {
// //         i++;
// //         axis--;
// //         let result = `x${axis}y${xy}`;
// //         shipCoordinate.push(result);
// //         name.coordinate.push(result)
// //     } while (i < length);
// // }
// // console.log(shipCoordinate)


// function moveAxis(name, dir, length, x, y) {


//     switch (dir) {
//         case (`left`):
//             // Sub(name, length, x, y)
//             break;
//         case (`right`):
//             // Add(name, length, x, y)
//             break;
//         case (`up`):
//             // Add(name, length, y, x)
//             break;
//         case (`down`):
//             // Sub(name, length, y, x)
//             break;
//     }
// }

// function generateCoordinate(n, c, l, d) {
//     // n is ship name
//     // c is the coordinate
//     // l is the length of the ship
//     // d is the direction
//     let x = rng()
//     let y = rng()
//     moveAxis(n, d, l, x, y)
//     let result = `x${x}y${y}`;
//     c.push(result)
//     shipCoordinate.push(result);
//     // console.log(result)
//     return result;
// }

// // let bc = (battleship.coordinate)
// // bc.push(generateCoordinate())

// // console.log(battleship.coordinate)
// function coordinate() {
//     shipLists.forEach((element) => {
//         let length = element.length;
//         let direction = element.direction;
//         let coordinate = element.coordinate;
//         if (coordinate.length === 0) {
//             generateCoordinate(element, coordinate, length, direction)
//             // console.log(shipCoordinate)
//         }
//         coordinate.forEach((element) => {
//             let result = shipCoordinate.indexOf(element);
//             shipHit.push(result);
//             // console.log(result)
//         })
//         // console.log(shipHit, length);




//     });
// }
// coordinate()
// // this function is going to be called at the start of the game and every round
// // the direction function is also going to be called every round



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
        this.speed = 5;
        this.xCoord = undefined;
        this.yCoord = undefined;
        this.direction = generateDirection();
        this.rotation = rotation(this.direction);
    }
}
class Destroyer {
    constructor() {
        this.name = "Destroyer";
        this.size = 4;
        this.speed = 4;
        this.xCoord = undefined;
        this.yCoord = undefined;
        this.direction = undefined;
        this.rotation = undefined;
    }
}
let shipList = [new AircraftCarrier(), new Destroyer()];

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

function rotation(inputShip) {
    let direction = generateDirection();
    switch (direction) {
        case (`left`):
            inputShip.rotation = `horizontal`;
            break;
        case (`right`):
            inputShip.rotation = `horizontal`;
            break;
        case (`up`):
            inputShip.rotation = `vertical`;
            break;
        case (`down`):
            inputShip.rotation = `vertical`;
            break;
    }
}


// generates random number 1 - 20
function rng() {
    let rng = Math.floor((Math.random() * 20) + 1);
    return rng;
}
// Generates a random coordinate for the ship, makes sure ship does not escape grid
function randomCoord(inputShip) {
    rotation(inputShip);
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
        while (checkCoordValidity == false) {
            randomCoord(ship);
        }
        console.log(ship.rotation)
        console.log(`x${ship.xCoord}y${ship.yCoord} for ${ship.name}`);
    }
}
randomCoordinatesAllShips()

function coordinateRestriction(ship) {
    let xCoord = ship.xCoord;
    let yCoord = ship.yCoord;
    let variable1 = (xCoord <= 0 && xCoord > 20 && yCoord <= 0 && yCoord > 20);
    // If coordinates go under or over it will return true
    // console.log(variable1)
    let variable2 = undefined;
    if (ship.rotation == "horizontal") {
        if (ship.xCoord < ship.size) {
            variable2 = false;
        } else {
            variable2 = true;
        }
    }
    else if (ship.rotation == "vertical") {
        if (ship.yCoord < ship.size) {
            variable2 = false;
        } else {
            variable2 = true;
        }
    } else {
        variable2 = true;
    }
    return variable1 && variable2;
 
}
// console.log(coordinateRestriction())
function moveShip(inputShip) {
    let xCoord = inputShip.xCoord;
    let yCoord = inputShip.yCoord;
    let rotation = inputShip.rotation;
    let speed = inputShip.speed;
    switch (generateDirection()) {
        case (`right`):
            inputShip.xCoord += speed;
            break;
        case (`left`):
            inputShip.xCoord -= speed;
            break;
        case (`up`):
            inputShip.yCoord += speed;
            break;
        case (`down`):
            inputShip.yCoord -= speed;
            break;
    }
    console.log(inputShip.xCoord, xCoord, inputShip.yCoord, yCoord, rotation)
    if (!(checkCoordValidity()) && coordinateRestriction(inputShip) === false) {
        inputShip.xCoord = xCoord;
        inputShip.yCoord = yCoord;
        console.log(!(checkCoordValidity()), coordinateRestriction(inputShip))
    }

}
for (ship of shipList) {
    moveShip(ship)
    console.log(ship.xCoord, ship.yCoord)
}

// This function uses the number generator to decide what direction the ships is going
// Going to need to check if direction is available



// function shipAction() {
//     for (let ship of shipList) {
//         if (rng() <= 10) {
//             rotation(ship);
//             while (checkCoordValidity() === false){
//                 rotation(ship);
//             }
//        } else {
//             moveShip(ship);
//         }
//     }
// }
// shipAction()

