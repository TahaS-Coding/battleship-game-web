document.addEventListener(`DOMContentLoaded`, function() {
    let gameBoardOverlay = document.getElementById('gameBoardOverlay');
    let gameBoard = new Map();
    // 2 for loops to create a 2d array for the OVERLAY board as well as create a map for the actual GAME baord
    for (rows = 1; rows < 21; rows++) {
        for (columns = 1; columns < 21; columns++) {
            // Creates button elements with unique coordinate id's as children of overlay
            let sqrID = `x${columns}y${rows}`;
            let newSquare = document.createElement("button");
            newSquare.setAttribute("id", sqrID);
            newSquare.classList.add("squares");
              // detects if square has a ship on it
            newSquare.addEventListener("click", function(){
                // gets coordinates of clicked square
                let clickedSqrID = this.getAttribute("id");
                let splitID = this.getAttribute("id").split('');
                let sqrXCoord = null;
                let sqrYCoord = null;
                for (let char of splitID){
                    if (typeof char == "number" && sqrXCoord == null){
                        sqrXCoord = Number(char);
                    }
                    else if(typeof char == "number" && sqrXCoord != null){
                        sqrYCoord = Number(char);
                    }
                }
                // sees if ship is on that coordinate
                for(let ship of shipList){
                    if(ship.rotation == "horizontal"){
                        for(let i = sqrXCoord; i > sqrXCoord - ship.size; i--){
                            if(clickedSqrID == `x${i}y${ship.yCoord}`){
                                console.log("Hit ship");
                            }
                        }
                    }
                    else if(ship.rotation == "vertical"){
                        for(let i = sqrYCoord; i < sqrYCoord + ship.size; i++){
                            if(clickedSqrID == `x${ship.xCoord}y${i}`){
                                console.log("Hit ship");
                            }
                        }
                    }
                    else{
                        console.log("No ship hit");
                    }
                }
            })
            gameBoardOverlay.appendChild(newSquare);
            //creates a map for gameboard squares 
            gameBoard.set(`${sqrID}`, {});			
        }
    }

    class AircraftCarrier{
        constructor(){
            this.size = 5;
            this.xCoord = 8;
            this.yCoord = 10;
            this.rotation = "horizontal";
        }
    }
    class Destroyer{
        constructor(){
            this.size = 4;
            this.xCoord = 15;
            this.yCoord = 15;
            this.rotation = "vertical";
        }
    }
    let shipList = [new AircraftCarrier(), new Destroyer()];
});
