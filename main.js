document.addEventListener(`DOMContentLoaded`, function() {
    let gameBoardOverlay = document.getElementById('gameBoardOverlay');
    let gameBoard = new Map();
    // 2 for loops to create a 2d array for the OVERLAY board as well as create a map for the actual GAME baord
    for (rows = 1; rows < 21; rows++) {
        for (columns = 1; columns < 21; columns++) {
            // Creates button elements with unique coordinate id's as children of overlay, also have ship hit detection on click
            let sqrID = `x${columns}y${rows}`;
            let newSquare = document.createElement("button");
            newSquare.setAttribute("id", sqrID);
            newSquare.classList.add("squares");
            newSquare.addEventListener("click", function(){
                // gets coordinates of clicked square
                let clickedSqrID = this.getAttribute("id");
                let splitID = clickedSqrID.match(/\d+/g);
                let sqrXCoord = null;
                let sqrYCoord = null;
                for (let char of splitID){
                    let num = Number(char);
                    if (sqrXCoord == null){
                        sqrXCoord = num;
                    }
                    else if(sqrXCoord != null){
                        sqrYCoord = num;
                    }
                }
                // sees if ship is on that coordinate
                for(let ship of shipList){
                    if(ship.rotation == "horizontal" && ship.yCoord == sqrYCoord){
                        if (sqrXCoord <= ship.xCoord && sqrXCoord > ship.xCoord - ship.size){
                            alert(`hit carrier at (${clickedSqrID})`);
                        }
                    }
                    else if(ship.rotation == "vertical" && ship.xCoord == sqrXCoord){
                        if (sqrYCoord >= ship.yCoord && sqrYCoord < ship.yCoord + ship.size){
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
