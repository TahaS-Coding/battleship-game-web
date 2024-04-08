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
                // gets coordinates of clicked square
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
                newSquare.addEventListener("mouseover", function(){
                    let spanCoord = newSquare.getAttribute("id");
                    console.log(spanCoord)
                })

                // sees if ship is on that coordinate
                for (let ship of shipList) {
                    if (ship.rotation == "horizontal" && ship.yCoord == sqrYCoord) {
                        if (sqrXCoord <= ship.xCoord && sqrXCoord > ship.xCoord - ship.size) {
                            alert(`hit carrier at (${clickedSqrID})`);
                        }
                    }
                    else if (ship.rotation == "vertical" && ship.xCoord == sqrXCoord) {
                        if (sqrYCoord <= ship.yCoord && sqrYCoord > ship.yCoord - ship.size) {
                            alert(`hit destroyer at (${clickedSqrID})`);
                        }
                    }
                }
            });
            gameBoardOverlay.appendChild(newSquare);
            //creates a map for gameboard squares 
            gameBoard.set(`${sqrID}`, {});
        }
    }

    class AircraftCarrier {
        constructor() {
            this.name = "AircraftCarrier";
            this.size = 5;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = "horizontal";
            this.occupiedSquares = undefined;
        }
    }
    class Destroyer {
        constructor() {
            this.name = "Destroyer";
            this.size = 4;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = "vertical";
            this.occupiedSquares = undefined;
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
    function randomCoords(inputShip){
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
    for (let ship of shipList) {
        randomCoords(ship);
        if(ship.rotation)
        ship.occupiedSquares = [[ship.xCoord, ship.yCoord]];
        for (let i = 0; i < shipList.length; i++){
            let shipCoordinate = shipList[i].occupiedSquares;
            if (ship.occupiedSquares[0] == shipCoordinate[0] && ship.occupiedSquares[1] == shipCoordinate[1]){
                randomCoords(ship);
                i = 0;
            }
        }
    }
    for (let ship of shipList) {
        console.log(`the ${ship.name}'s coordinates are (${ship.xCoord}, ${ship.yCoord}) `)
    }


    
});
