document.addEventListener(`DOMContentLoaded`, function () {
    let gameBoardOverlay = document.getElementById('gameBoardOverlay');
    let gameBoard = new Map();
    // 2 for loops to create a 2d array for the OVERLAY board as well as create a map for the actual GAME baord
    for (rows = 20; rows > 0; rows--) {
        for (columns = 1; columns < 21; columns++) {
            // Creates button elements with unique coordinate id's as children of overlay, also have ship hit detection on click
            let sqrID = `x${columns}y${rows}`;
            let newSquare = document.createElement("button");
            newSquare.setAttribute("id", sqrID);
            newSquare.classList.add("squares");
            newSquare.addEventListener("click", function () {
                // Gets coordinates of clicked square
                let clickedSqrID = this.getAttribute("id");
                let splitID = clickedSqrID.match(/\d+/g);
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
                // Shows coord in console.log() when hovering squares
                newSquare.addEventListener("mouseover", function () {
                    let spanCoord = newSquare.getAttribute("id");
                    console.log(spanCoord);
                })

                // Sees if ship is on that coordinate
                for (let ship of shipList) {
                    let health = ship.health;
                    if (ship.rotation == "horizontal" && ship.yCoord == sqrYCoord) {
                        if (sqrXCoord <= ship.xCoord && sqrXCoord > ship.xCoord - ship.size) {
                            health--;
                            alert(`hit carrier at (${clickedSqrID})`);
                        }
                    }
                    else if (ship.rotation == "vertical" && ship.xCoord == sqrXCoord) {
                        if (sqrYCoord <= ship.yCoord && sqrYCoord > ship.yCoord - ship.size) {
                            health--;
                            alert(`hit destroyer at (${clickedSqrID})`);
                        }
                    }
                }
            });
            gameBoardOverlay.appendChild(newSquare);
            //Creates a map for gameboard squares 
            gameBoard.set(`${sqrID}`, {});
        }
    }

    class AircraftCarrier {
        constructor() {
            this.name = "AircraftCarrier";
            this.health = 6;
            this.size = 5;
            this.speed = 4;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = "horizontal";
        }
    }
    class Destroyer {
        constructor() {
            this.name = "Destroyer";
            this.health = 4;
            this.size = 4;
            this.speed = 3;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = "vertical";
        }
    }
    let shipList = [new AircraftCarrier(), new Destroyer()];



    function rng() {
        let rng = Math.floor((Math.random() * 20) + 1);
        // Generates a number 1 - 20  
        // The 20 makes it generate a number less than 20
        // It actually generating a 0 - 19, so adding 1 solves the problem
        return (rng);
    }
    function randomCoords(inputShip) {
        // Generates a coordinate based on the orientation of the ship
        // It makes sure that the ships' coordinates will generate outside the grid
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

    // CheckCoord() will be called every round to make sure that the ship won't move off the grid
    function checkCoord() {
        // Keeps track of coordinate that have been taken
        let notAvailable = [];
        for (let ship of shipList) {
            randomCoords(ship);
            // randomCoords() should be called once at the start of the game
            let checking = [];
            // A temporary array of coordinates
            let name = ship.name;
            let xAxis = ship.xCoord;
            let yAxis = ship.yCoord;
            let size = ship.size;
            let rotation = ship.rotation;
            // Check the ship rotation, based on the ship rotation the x or y axis will have to change while the axis will stay constant
            if (rotation == `horizontal`) {
                let coordinateList = Sub(size, xAxis, yAxis, `x`);
                // Sub will generate an array of coordinates
                // The loop will push the new coordinates into a temporary array
                for (let coord of coordinateList) {
                    checking.push(coord);
                }
            } else if (rotation == `vertical`) {
                let coordinateList = Sub(size, yAxis, xAxis, `y`);
                for (let coord of coordinateList) {
                    checking.push(coord);
                }
            }
            // console.log(name, xAxis, yAxis, rotation, size)
            // console.log(checking)
            let result = undefined;
            for (let coord of checking) {
                let check = notAvailable.indexOf(coord);
                if (check >= 0) {
                    result = false;
                    checkCoord();
                    break;
                } else {
                    result = true;
                }
            }
            if (result === true) {
                for (let coord of checking) {
                    notAvailable.push(coord);
                }
            } else {
                
            }

        }
        // console.log(notAvailable)
    }             
    checkCoord();
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
                // Subtracts 1 from x coordinate and y stays constant
                result.push(`x${axis}y${otherAxis}`);
            } else if (xy == `y`) {
                // Subtracts 1 from y coordinate and x stays constant
                result.push(`x${otherAxis}y${axis}`);
            }
        };
        return result;
    }
});
