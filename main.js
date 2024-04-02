document.addEventListener(`DOMContentLoaded`, function() {
    // OVERLAY BOARD
    let gameBoardOverlay = document.getElementById('gameBoardOverlay');
    for (rows = 1; rows < 21; rows++) {
        for (columns = 1; columns < 21; columns++) {
            let sqrID = `x${columns}y${rows}`;
            let newSquare = document.createElement("button");
            newSquare.setAttribute("id", sqrID);
            newSquare.classList.add("squares");
            newSquare.addEventListener("click", function(){
                console.log(this.id);
            })
            gameBoardOverlay.appendChild(newSquare);					
        }
    }
});