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
            newSquare.addEventListener("click", function(){
                for(let ship of shipList){
                    if(this.getAttribute("id") == `x${ship.xCoord}y${ship.yCoord}`){
                        // if (ship.rotation == "horizontal"){
                        //     for (let i = 0; i < ship.xCoord; i++){
                                
                        //     }
                        //     for (let i = 0; i < ship.yCoord; i++){
                                
                        //     }
                        // }
                        console.log("Hit SHip");
                    }
                    else{
                        console.log("No ship has been hit");
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
            this.xSize = 5;
            this.ySize = 2;
            this.xCoord = 2;
            this.yCoord = 2;
            this.rotation = "horizontal";
        }

        
    }
    let shipList = [new AircraftCarrier()]
    class Destroyer{
        constructor(){
            this.xSize = 4;
            this.ySize = 1;
        }

    }
    class Cruiser{
        constructor(){
            this.xSize = 2;
            this.ySize = 1;
        }

    }
    class Battleship{
        constructor(){
            this.xSize = 4;
            this.ySize = 1;
        }

    }
    class Submarine{
        constructor(){
            this.xSize = 3;
            this.ySize = 1;
        }

    }
});
