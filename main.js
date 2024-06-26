document.addEventListener(`DOMContentLoaded`, function () {
    // global variables
    let gameMode = undefined;
    let playerOneShipsSelected = false;
    let playerTwoShipsSelected = false;
    let selectingPlayerTwoShips = false;
    let playerOneShipList = [];
    let playerTwoShipList = [];
    let computerShipList = [];
    let playerOneAbilityList = [];
    let playerTwoAbilityList = [];
    let computerAbilityList = {};
    let player = "p1";

    // game mode select screen
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

    // ship select screen
    let shipSelectionScreen = document.getElementById('shipSelection');
    let shipSelectionContinueButton = document.getElementById("shipSelectionContinueButton");
    let chosenShips = document.getElementById("chosenShips");
    let whoseShipsBeingSelectedHeading = document.getElementById("whoseShipsBeingSelected");
    let addCarrierButton = document.getElementById("addCarrier");
    let addDestroyerButton = document.getElementById("addDestroyer");
    let addCruiserButton = document.getElementById("addCruiser");
    let addBattleshipButton = document.getElementById("addBattleship");
    let addFrigateButton = document.getElementById("addFrigate");
    let shipAddButtons = [addCarrierButton, addDestroyerButton, addCruiserButton, addBattleshipButton, addFrigateButton];
    for (button of shipAddButtons) {
        button.addEventListener('click', function (e) {
            // what type of ship to add to game code and html
            let ship;
            let shipElement = document.createElement("section");
            let shipNameHeading = document.createElement("h4");
            let shipRemoveButton = document.createElement("button");
            shipRemoveButton.innerText = "-";

            if (e.target.id == "addCarrier") {
                ship = new AircraftCarrier();
                shipNameHeading.innerText = "Aircraft Carrier";
            }
            else if (e.target.id == "addDestroyer") {
                ship = new Destroyer();
                shipNameHeading.innerText = "Destroyer";
            }
            else if (e.target.id == "addCruiser") {
                ship = new Cruiser();
                shipNameHeading.innerText = "Cruiser";
            }
            else if (e.target.id == "addBattleship") {
                ship = new Battleship();
                shipNameHeading.innerText = "Battleship";
            }
            else if (e.target.id == "addFrigate") {
                ship = new Frigate();
                shipNameHeading.innerText = "Frigate";
            }
            shipRemoveButton.addEventListener('click', function () {
                if (selectingPlayerTwoShips == false) {
                    playerOneShipList.splice(playerOneShipList.indexOf(ship), 1);
                    console.log(playerOneShipList);
                    playerOneShipsSelected = false;
                }
                else {
                    playerTwoShipList.splice(playerTwoShipList.indexOf(ship), 1);
                    playerTwoShipsSelected = false;
                }
                shipElement.remove();
            });
            shipElement.appendChild(shipNameHeading);
            shipElement.appendChild(shipRemoveButton);

            // computer opponent
            if (gameMode == "computer" && playerOneShipsSelected == false) {
                playerOneShipList.push(ship);
                chosenShips.appendChild(shipElement);
                if (playerOneShipList.length == 5) {
                    playerOneShipsSelected = true;
                }
            }
            else if (gameMode == "computer" && playerOneShipsSelected == true) {
                // alert("ships full");
            }
            // player vs player
            if (gameMode == "player" && playerOneShipsSelected == false) {
                playerOneShipList.push(ship);
                chosenShips.appendChild(shipElement);
                if (playerOneShipList.length == 5) {
                    playerOneShipsSelected = true;
                }
            }
            else if (gameMode == "player" && playerOneShipsSelected == true && selectingPlayerTwoShips == false) {
                // alert("ships full");
            }
            else if (gameMode == "player" && playerTwoShipsSelected == false) {
                playerTwoShipList.push(ship);
                chosenShips.appendChild(shipElement);
                if (playerTwoShipList.length == 5) {
                    playerTwoShipsSelected = true;
                }
            }
            else if (gameMode == "player" && playerTwoShipsSelected == true) {
                // alert("ships full");
            }
        });
    }
    shipSelectionContinueButton.addEventListener('click', function () {
        // computer opponent
        if (gameMode == "computer" && playerOneShipsSelected == true) {
            shipSelectionScreen.classList.add("hidden");
            gameplayScreen.classList.remove("hidden");
            createOverlays();
            createButtons(playerOneShipList, playerOneAbilityList, playerOneAbilityListHTML);
            assignComputerShipsAndAbilities();
            createHealthBars();
            randomCoordinatesAllShips(playerOneShipList);
            randomCoordinatesAllShips(computerShipList);
        }
        else if (gameMode == "computer" && playerOneShipsSelected == false) {
            // alert("choose 5 ships");
        }
        //player vs player
        if (gameMode == "player" && playerOneShipsSelected == true && selectingPlayerTwoShips == false) {
            chosenShips.innerHTML = "";
            whoseShipsBeingSelectedHeading.innerText = "Player Two Ships";
            selectingPlayerTwoShips = true;
        }
        else if (gameMode == "player" && playerOneShipsSelected == false) {
            // alert("choose 5 ships");
        }
        else if (gameMode == "player" && playerTwoShipsSelected == true) {
            shipSelectionScreen.classList.add("hidden");
            gameplayScreen.classList.remove("hidden");
            createOverlays();
            createButtons(playerOneShipList, playerOneAbilityList, playerOneAbilityListHTML);
            createButtons(playerTwoShipList, playerTwoAbilityList, playerTwoAbilityListHTML);
            createHealthBars();
            randomCoordinatesAllShips(playerOneShipList);
            randomCoordinatesAllShips(playerTwoShipList);
        }
        else if (gameMode == "player" && playerTwoShipsSelected == false) {
            // alert("choose 5 ships");
        }
    });

    // gameplay screen
    let gameplayScreen = document.getElementById('gameScreen');
    let playerOneOverlayBoard = document.getElementById("gameBoardOverlayPlayerOne");
    let playerTwoOverlayBoard = document.getElementById("gameBoardOverlayPlayerTwo");
    let playerOneGrid = document.getElementById("playerOneGrid");
    let playerTwoGrid = document.getElementById("playerTwoGrid");
    let playerOneAbilityListHTML = document.getElementById('playerOneAbilityList');
    let playerTwoAbilityListHTML = document.getElementById('playerTwoAbilityList');
    let playerOneHealth = document.getElementById("playerOneHealth");
    let playerTwoOrComputerHealth = document.getElementById("playerTwoOrComputerHealth");
    let playerTwoOrComputerHealthHeading = document.getElementById("playerTwoOrComputerHealthHeading");
    //ABILITIES
    function createButtons(shipList, ablitityArray, abilityList) {
        let airplane = 0;
        let torpedo = 0;
        let missile = 0;
        let bombardment = 0;
        let scout = 0;
        // create array of all abilities
        for (let ship of shipList) {
            ablitityArray.push(ship.abilityName);
        }
        // how many of each ability
        for (let ability of ablitityArray) {
            switch (ability) {
                case "Airplane":
                    airplane += 3;
                    break;
                case "Torpedo":
                    torpedo += 3;
                    break;
                case "Missile":
                    missile += 3;
                    break;
                case "Bombardment":
                    bombardment += 3;
                    break;
                case "Scout":
                    scout += 1;
                    break;
            }
        }
        // add abilities to players list
        if (airplane > 0) {
            let airplaneAbilityButton = document.createElement("button");
            airplaneAbilityButton.setAttribute("name", "off");
            airplaneAbilityButton.setAttribute("class", "airplaneAbilityButton");
            airplaneAbilityButton.innerText = airplane;
            airplaneAbilityButton.addEventListener("click", function () {
                abilityButtonBehavior(airplaneAbilityButton, abilityList);
            });
            abilityList.appendChild(airplaneAbilityButton);
        }
        if (torpedo > 0) {
            let torpedoAbilityButton = document.createElement("button");
            torpedoAbilityButton.setAttribute("name", "off");
            torpedoAbilityButton.setAttribute("class", "torpedoAbilityButton");
            torpedoAbilityButton.innerText = torpedo;
            torpedoAbilityButton.addEventListener("click", function () {
                abilityButtonBehavior(torpedoAbilityButton, abilityList);
            });
            abilityList.appendChild(torpedoAbilityButton);
        }
        if (missile > 0) {
            let missileAbilityButton = document.createElement("button");
            missileAbilityButton.setAttribute("name", "off");
            missileAbilityButton.setAttribute("class", "missileAbilityButton");
            missileAbilityButton.innerText = missile;
            missileAbilityButton.addEventListener("click", function () {
                abilityButtonBehavior(missileAbilityButton, abilityList);
            });
            abilityList.appendChild(missileAbilityButton);
        }
        if (bombardment > 0) {
            let bombardmentAbilityButton = document.createElement("button");
            bombardmentAbilityButton.setAttribute("name", "off");
            bombardmentAbilityButton.setAttribute("class", "bombardmentAbilityButton");
            bombardmentAbilityButton.innerText = bombardment;
            bombardmentAbilityButton.addEventListener("click", function () {
                abilityButtonBehavior(bombardmentAbilityButton, abilityList);
            });
            abilityList.appendChild(bombardmentAbilityButton);
        }
        if (scout > 0) {
            let scoutAbilityButton = document.createElement("button");
            scoutAbilityButton.setAttribute("name", "off");
            scoutAbilityButton.setAttribute("class", "scoutAbilityButton");
            scoutAbilityButton.innerText = scout;
            scoutAbilityButton.addEventListener("click", function () {
                // shows a random enemy ship coordinate on the overlay
                let abilityUsesLeft = Number(scoutAbilityButton.innerText);
                let anyAbilityActive = false;
                //are any abilities already active excluding the clicked button
                for (let abilityButton of abilityList.children) {
                    if (abilityButton.name == "on" && abilityButton != scoutAbilityButton) {
                        anyAbilityActive = true;
                    }
                }
                // if not button can change states
                if (anyAbilityActive == false) {
                    if (scoutAbilityButton.name == "off" && abilityUsesLeft > 0) {
                        scoutAbilityButton.name = "on";
                        scoutAbilityButton.innerText = abilityUsesLeft - 1;

                        let enemyShipList;
                        if (gameMode == "computer") {
                            enemyShipList = computerShipList;
                        }
                        else {
                            if (abilityList == playerOneAbilityListHTML) {
                                enemyShipList = playerTwoShipList;
                            }
                            else {
                                enemyShipList = playerOneShipList;
                            }
                        }
                        // all enemy ships still standing
                        let availableShips = [];
                        for (ship of enemyShipList) {
                            if (ship.currHealth > 0) {
                                availableShips.push(ship);
                            }
                        }
                        // get coordinates for each ship
                        let enemyShipCoordinates = [];
                        for (ship of availableShips) {
                            enemyShipCoordinates.push({ "xCoord": ship.xCoord, "yCoord": ship.yCoord });
                        }
                        // choose one of these coordinates randomly 
                        let chosenCoord = enemyShipCoordinates[Math.floor(Math.random() * enemyShipCoordinates.length)];
                        // update that square on the overlay to start blinking
                        if (enemyShipList == playerTwoShipList || enemyShipList == computerShipList) {
                            playerOneGrid.querySelector(`button[name="x${chosenCoord.xCoord}y${chosenCoord.yCoord}"]`).classList.add("scouting");
                        }
                        else if (enemyShipList == playerOneShipList) {
                            playerTwoGrid.querySelector(`button[name="x${chosenCoord.xCoord}y${chosenCoord.yCoord}"]`).classList.add("scouting");
                        }
                    }
                }
            });
            abilityList.appendChild(scoutAbilityButton);
        }
    }
    function abilityButtonBehavior(button, abilityList) {
        let abilityUsesLeft = Number(button.innerText);
        let anyAbilityActive = false;
        //are any abilities already active excluding the clicked button
        for (let abilityButton of abilityList.children) {
            if (abilityButton.name == "on" && abilityButton != button) {
                anyAbilityActive = true;
            }
        }
        // if not button can change states
        if (anyAbilityActive == false) {
            if (button.name == "on") {
                button.name = "off";
                button.innerText = abilityUsesLeft + 1;
            }
            else if (button.name == "off" && abilityUsesLeft > 0) {
                button.name = "on";
                button.innerText = abilityUsesLeft - 1;
            }
        }
    }
    function assignComputerShipsAndAbilities() {
        // assign random ships
        for (let i = 0; i < 5; i++) {
            let randomNum = Math.random();
            if (randomNum < 0.2) {
                computerShipList.push(new AircraftCarrier());
            }
            else if (randomNum < 0.4) {
                computerShipList.push(new Frigate());
            }
            else if (randomNum < 0.6) {
                computerShipList.push(new Cruiser());
            }
            else if (randomNum < 0.8) {
                computerShipList.push(new Destroyer());
            }
            else {
                computerShipList.push(new Battleship());
            }
        }
        // abilities
        let abilityTypes = {
            "airplane": 0,
            "torpedo": 0,
            "missile": 0,
            "bombardment": 0
        }
        // create array of all abilities
        let arrayOfAbilities = [];
        for (let ship of computerShipList) {
            arrayOfAbilities.push(ship.abilityName);
        }
        // how many of each ability
        for (let ability of arrayOfAbilities) {
            switch (ability) {
                case "Airplane":
                    abilityTypes.airplane += 1;
                    break;
                case "Torpedo":
                    abilityTypes.torpedo += 1;
                    break;
                case "Missile":
                    abilityTypes.missile += 1;
                    break;
                case "Bombardment":
                    abilityTypes.bombardment += 1;
                    break;
            }
        }
        // push to computerAbilityList
        for (ability in abilityTypes) {
            if (ability > 0) {
                computerAbilityList.ability = ability;
            }
        }
    }
    // HEALTH BARS
    function createHealthBars() {
        if (gameMode == "player") {
            playerTwoOrComputerHealthHeading.innerText = "PlayerTwo";
            for (ship of playerOneShipList) {
                // creates health bar and appends it to respective html list
                playerOneHealth.appendChild(healthBarHTML(ship));
            }
            for (ship of playerTwoShipList) {
                // creates health bar and appends it to respective html list
                playerTwoOrComputerHealth.appendChild(healthBarHTML(ship));
            }
        }
        else if (gameMode == "computer") {
            playerTwoOrComputerHealthHeading.innerText = "Computer";
            for (ship of playerOneShipList) {
                // creates health bar and appends it to respective html list
                playerOneHealth.appendChild(healthBarHTML(ship));
            }
            for (ship of computerShipList) {
                // creates health bar and appends it to respective html list
                playerTwoOrComputerHealth.appendChild(healthBarHTML(ship));
            }
        }
    }
    function healthBarHTML(ship) {
        // create the health bar
        let shipHealthElement = document.createElement("section");
        let shipName = document.createElement("h3");
        let healthBar = document.createElement("div");
        let healthBarFill = document.createElement("div");
        let healthNumber = document.createElement("p");

        shipName.innerText = ship.name;
        healthBar.classList.add("health-bar");
        healthBarFill.classList.add("health-bar-fill");
        healthNumber.innerText = ship.health;
        healthNumber.classList.add("health-number");

        healthBarFill.appendChild(healthNumber);
        healthBar.appendChild(healthBarFill);
        shipHealthElement.appendChild(shipName);
        shipHealthElement.appendChild(healthBar);

        return shipHealthElement;
    }
    function updateHealth() {
        // update health bars
        if (gameMode == "player") {
            updateHealthHTML(playerOneShipList, playerOneHealth);
            updateHealthHTML(playerTwoShipList, playerTwoOrComputerHealth);
        }
        else if (gameMode == "computer") {
            updateHealthHTML(playerOneShipList, playerOneHealth);
            updateHealthHTML(computerShipList, playerTwoOrComputerHealth);
        }
        // check if game over
        let shipLists;
        if (gameMode == "player") {
            shipLists = [playerOneShipList, playerTwoShipList];
        }
        else if (gameMode == "computer") {
            shipLists = [playerOneShipList, computerShipList];
        }
        let gameOver = false;
        let loser;
        for (let shipList of shipLists) {
            let shipsDefeated = 0;
            for (let ship of shipList) {
                if (ship.currHealth < 1) {
                    shipsDefeated += 1
                }
            }
            if (shipsDefeated == 5) {
                gameOver = true;
                switch (shipList) {
                    case playerOneShipList:
                        loser = "Player One";
                        break;
                    case playerTwoShipList:
                        loser = "Player Two";
                        break;
                    case computerShipList:
                        loser = "Computer";
                        break;
                }
            }
        }
        if (gameOver == true) {
            gameOverScreen.classList.remove("hidden");
            switch (loser) {
                case 'Player One':
                    if (gameMode == "computer") {
                        gameOverText.innerText = "Computer Wins";
                    }
                    else {
                        gameOverText.innerText = "Player Two Wins";
                    }
                    break;
                case 'Player Two':
                    gameOverText.innerText = "Player One Wins";
                    break;
                case 'Computer':
                    gameOverText.innerText = "Player One Wins";
                    break;
            }
            console.log("game over");
        }
    }
    function updateHealthHTML(shipList, healthList) {
        // for each ship list, finds the corresponding health element for each ship because they share the same index, then finds the necassary elements within it
        for (i = 0; i < shipList.length; i++) {
            let shipHealthElement = healthList.children[i];
            let healthBarFillElement = shipHealthElement.querySelector('.health-bar-fill');
            let healthNumberElement = shipHealthElement.querySelector('.health-number');

            let ship = shipList[i];
            if (ship.currHealth >= 0) {
                healthBarFillElement.style.width = `${(ship.currHealth / ship.health) * 100}%`;
                healthNumberElement.innerText = ship.currHealth;
            }
        }
    }

    // instructions overlay
    let instructionsButtons = document.querySelectorAll('.instructionsButton');
    let instructionsOverlay = document.querySelectorAll('.instructionsOverlay');
    let closeInstructionsOverlayButtons = document.querySelectorAll('.closeInstructionsOverlay');
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

    // game over overlay
    let gameOverScreen = document.querySelector(".game-over-screen");
    let gameOverText = document.getElementById("gameOverText");
    let restartButton = document.getElementById("restart");
    restartButton.addEventListener("click", function () {
        location.reload();
    });




    // 2 for loops to create a 2d array for the overlay board(s)
    function createOverlays() {
        for (rows = 13; rows > 0; rows--) {
            for (columns = 1; columns < 14; columns++) {
                // Creates button elements with unique coordinate id's, hit detection, as children of overlay
                let sqrID = `x${columns}y${rows}`;
                let newSquare = document.createElement("button");
                newSquare.setAttribute("name", sqrID);
                newSquare.classList.add("squares");
                let newSquareClone = newSquare.cloneNode(true);
                // when square clicked
                newSquare.addEventListener("click", function () {
                    // Gets coordinates of clicked square
                    let clickedSqrID = this.getAttribute("name");
                    hitCoordinate(clickedSqrID);
                    updateHealth();
                    //change player turn
                    if (gameMode == "player") {
                        playerOneOverlayBoard.classList.add("hidden");
                        moveShips(playerOneShipList);
                        playerTwoOverlayBoard.classList.remove("hidden");
                        player = "p2";
                    }
                    else if (gameMode == "computer") {
                        computerStuff();
                    }
                });
                newSquareClone.addEventListener("click", function () {
                    // Gets coordinates of clicked square
                    let clickedSqrID = this.getAttribute("name");
                    hitCoordinate(clickedSqrID);
                    updateHealth();
                    //change player turn
                    if (gameMode == "player") {
                        playerTwoOverlayBoard.classList.add("hidden");
                        moveShips(playerTwoShipList);
                        playerOneOverlayBoard.classList.remove("hidden");
                        player = "p1";
                    }
                });
                // when hovering over a square
                newSquare.addEventListener("mouseover", function () {
                    let clickedSqrID = this.getAttribute("name");
                    squareMouseOver(playerOneGrid, clickedSqrID);
                });
                newSquareClone.addEventListener("mouseover", function () {
                    let clickedSqrID = this.getAttribute("name");
                    squareMouseOver(playerTwoGrid, clickedSqrID);
                });
                newSquare.addEventListener("mouseout", function () {
                    let clickedSqrID = this.getAttribute("name");
                    squareMouseOut(playerOneGrid);
                });
                newSquareClone.addEventListener("mouseout", function () {
                    let clickedSqrID = this.getAttribute("name");
                    squareMouseOut(playerTwoGrid);
                });
                // mobile hover stuff
                newSquare.addEventListener("touchstart", function () {
                    let clickedSqrID = this.getAttribute("name");
                    squareMouseOver(playerOneGrid, clickedSqrID);
                });
                newSquareClone.addEventListener("touchstart", function () {
                    let clickedSqrID = this.getAttribute("name");
                    squareMouseOver(playerTwoGrid, clickedSqrID);
                });
                newSquare.addEventListener("touchend", function () {
                    let clickedSqrID = this.getAttribute("name");
                    squareMouseOut(playerOneGrid);
                });
                newSquareClone.addEventListener("touchend", function () {
                    let clickedSqrID = this.getAttribute("name");
                    squareMouseOut(playerTwoGrid);
                });
                // for displaying previous hits
                newSquare.hitState = "none";
                newSquareClone.hitState = "none";
                // append square to html grid
                if (gameMode == "player") {
                    playerOneGrid.appendChild(newSquare);
                    playerTwoGrid.appendChild(newSquareClone);
                }
                else {
                    playerOneGrid.appendChild(newSquare);
                }
            }
        }
    }
    function squareMouseOver(overlayGrid, coordinate) {
        // find active ability
        let abilityList;
        if (overlayGrid == playerOneGrid) {
            abilityList = playerOneAbilityListHTML;
        }
        else {
            abilityList = playerTwoAbilityListHTML;
        }
        let activeAbility = "none";
        for (let abilityButton of abilityList.children) {
            if (abilityButton.name == "on") {
                switch (abilityButton.getAttribute("class")) {
                    case "airplaneAbilityButton":
                        activeAbility = "airplane";
                        break;
                    case "torpedoAbilityButton":
                        activeAbility = "torpedo";
                        break;
                    case "missileAbilityButton":
                        activeAbility = "missile";
                        break;
                    case "bombardmentAbilityButton":
                        activeAbility = "bombardment";
                        break;
                }
            }
        }
        // get coordinate of square
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
        // which squares to have hover effect
        switch (activeAbility) {
            case "airplane":
                // a 3x3 square
                squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord}y${sqrYCoord}"]`));
                squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord + 1}y${sqrYCoord}"]`));
                squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord - 1}y${sqrYCoord}"]`));
                squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord}y${sqrYCoord - 1}"]`));
                squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord + 1}y${sqrYCoord - 1}"]`));
                squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord - 1}y${sqrYCoord - 1}"]`));
                squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord}y${sqrYCoord + 1}"]`));
                squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord + 1}y${sqrYCoord + 1}"]`));
                squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord - 1}y${sqrYCoord + 1}"]`));
                break;
            case "torpedo":
                // a vertical line 5 squares
                for (i = 0; i < 5; i++) {
                    squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord}y${sqrYCoord + i}"]`));
                }
                break;
            case "missile":
                // one square 
                squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord}y${sqrYCoord}"]`));
                break;
            case "bombardment":
                // a horizontal line 4 squares
                for (i = 0; i < 4; i++) {
                    squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord + i}y${sqrYCoord}"]`));
                }
                break;
            case "none":
                // one square
                squareHoverAddClass(overlayGrid.querySelector(`button[name="x${sqrXCoord}y${sqrYCoord}"]`));
                break;
        }
    }
    function squareHoverAddClass(square) {
        if (square != null) {
            square.classList.add("squareHover");
        }
    }
    function squareMouseOut(overlayGrid) {
        for (square of overlayGrid.children) {
            square.classList.remove("squareHover");
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
        // Sees if ship is on that coordinate (based on whos grid is being attacked)
        let shipList;
        if (gameMode == "player") {
            if (player == "p1") {
                shipList = playerTwoShipList;
            }
            else {
                shipList = playerOneShipList;
            }
        }
        else if (gameMode == "computer") {
            if (player == "p1") {
                shipList = computerShipList;
            }
            else {
                shipList = playerOneShipList;
            }
        }
        // for all coordinates that are hit that turn, sees if any ships are on those coordinates, will decrease their health if there are any
        let abilityList;
        if (gameMode == "computer") {
            if (shipList == playerOneShipList) {
                abilityList = computerAbilityList;
            }
            else {
                abilityList = playerOneAbilityListHTML;
            }
        }
        else if (gameMode == "player") {
            if (shipList == playerOneShipList) {
                abilityList = playerTwoAbilityListHTML;
            }
            else if (shipList == playerTwoShipList) {
                abilityList = playerOneAbilityListHTML;
            }
        }

        let activeAbility = "none";
        // get any active ability if player, get random ability or no ability if computer
        if (abilityList != computerAbilityList) {
            for (let abilityButton of abilityList.children) {
                if (abilityButton.name == "on") {
                    switch (abilityButton.getAttribute("class")) {
                        case "airplaneAbilityButton":
                            activeAbility = "airplane";
                            break;
                        case "torpedoAbilityButton":
                            activeAbility = "torpedo";
                            break;
                        case "missileAbilityButton":
                            activeAbility = "missile";
                            break;
                        case "bombardmentAbilityButton":
                            activeAbility = "bombardment";
                            break;
                    }
                }
            }
        }
        else {
            // get array of all computer abilities
            let computerAbilities = Object.keys(computerAbilityList);

            // 20% chance to use an ability
            let randomNum = Math.random();
            if (randomNum < 0.2) {
                activeAbility = computerAbilities[Math.floor(Math.random() * computerAbilities.length)];
            }
        }


        let arrayOfHitCoordinates = [];
        switch (activeAbility) {
            case "airplane":
                // a 3x3 square
                arrayOfHitCoordinates.push({ "xCoord": sqrXCoord, "yCoord": sqrYCoord });
                arrayOfHitCoordinates.push({ "xCoord": sqrXCoord + 1, "yCoord": sqrYCoord });
                arrayOfHitCoordinates.push({ "xCoord": sqrXCoord - 1, "yCoord": sqrYCoord });
                arrayOfHitCoordinates.push({ "xCoord": sqrXCoord, "yCoord": sqrYCoord - 1 });
                arrayOfHitCoordinates.push({ "xCoord": sqrXCoord + 1, "yCoord": sqrYCoord - 1 });
                arrayOfHitCoordinates.push({ "xCoord": sqrXCoord - 1, "yCoord": sqrYCoord - 1 });
                arrayOfHitCoordinates.push({ "xCoord": sqrXCoord, "yCoord": sqrYCoord + 1 });
                arrayOfHitCoordinates.push({ "xCoord": sqrXCoord + 1, "yCoord": sqrYCoord + 1 });
                arrayOfHitCoordinates.push({ "xCoord": sqrXCoord - 1, "yCoord": sqrYCoord + 1 });
                attack(shipList, arrayOfHitCoordinates, 1);
                if (player == "ai") {
                    computerAbilityList.airplane -= 1;
                }
                break;
            case "torpedo":
                // a vertical line 5 squares
                for (let i = 0; i < 5; i++) {
                    arrayOfHitCoordinates.push({ "xCoord": sqrXCoord, "yCoord": sqrYCoord + i });
                }
                attack(shipList, arrayOfHitCoordinates, 1);
                if (player == "ai") {
                    computerAbilityList.torpedo -= 1;
                }
                break;
            case "missile":
                // one square but more damage
                arrayOfHitCoordinates.push({ "xCoord": sqrXCoord, "yCoord": sqrYCoord });
                attack(shipList, arrayOfHitCoordinates, 2);
                if (player == "ai") {
                    computerAbilityList.missile -= 1;
                }
                break;
            case "bombardment":
                // a horizontal line 4 squares
                for (let i = 0; i < 4; i++) {
                    arrayOfHitCoordinates.push({ "xCoord": sqrXCoord + i, "yCoord": sqrYCoord });
                }
                attack(shipList, arrayOfHitCoordinates, 1);
                if (player == "ai") {
                    computerAbilityList.bombardment -= 1;
                }
                break;
            case "none":
                // just the one square
                arrayOfHitCoordinates.push({ "xCoord": sqrXCoord, "yCoord": sqrYCoord });
                attack(shipList, arrayOfHitCoordinates, 1);
                break;
        }
        // now turn off the active abilities
        if (player != "ai") {
            for (let abilityButton of abilityList.children) {
                if (abilityButton.name == "on") {
                    abilityButton.name = "off";
                }
            }
        }
        // turn off scouting
        let overlayGrid;
        if (abilityList == playerOneAbilityListHTML) {
            overlayGrid = playerOneGrid;
        }
        else {
            overlayGrid = playerTwoGrid;
        }
        for (square of overlayGrid.children) {
            square.classList.remove("scouting");
        }
    }
    function computerStuff() {
        player = "ai";
        let clickedSqrID = `x${rng()}y${rng()}`;
        hitCoordinate(clickedSqrID);
        updateHealth();
        moveShips(computerShipList);
        // delete any depleted abilties
        for (let ability in computerAbilityList) {
            if (ability < 1) {
                delete computerAbilityList[ability];
            }
        }

        player = "p1";
    }
    function attack(shipList, hitCoordinates, damage) {
        // for adding hit states to squares
        let grid = null;
        if (shipList == playerTwoShipList || shipList == computerShipList) {
            grid = playerOneGrid;
        }
        else if (shipList == playerOneShipList && gameMode == "player") {
            grid = playerTwoGrid;
        }
        updateAllSquareStates(grid);
        // attack ships
        for (let coordinate of hitCoordinates) {
            let anyShipHit = false;
            for (let ship of shipList) {
                if (ship.rotation == "horizontal" && ship.yCoord == coordinate.yCoord) {
                    if (coordinate.xCoord <= ship.xCoord && coordinate.xCoord > ship.xCoord - ship.size) {
                        ship.currHealth -= damage;
                        anyShipHit = true;
                        console.log(`hit ${ship.name} at ${coordinate.xCoord}, ${coordinate.yCoord}`);
                    }
                }
                else if (ship.rotation == "vertical" && ship.xCoord == coordinate.xCoord) {
                    if (coordinate.yCoord <= ship.yCoord && coordinate.yCoord > ship.yCoord - ship.size) {
                        ship.currHealth -= damage;
                        anyShipHit = true;
                        console.log(`hit ${ship.name} at ${coordinate.xCoord}, ${coordinate.yCoord}`);
                    }
                }
            }
            if (anyShipHit == true) {
                updateSingleSquareState(grid, coordinate, true);
            }
            else if (anyShipHit == false) {
                updateSingleSquareState(grid, coordinate, false);
            }
        }

        updateSquareStatesStyle(grid);
    }

    // updating square states
    function updateSingleSquareState(grid, coordinate, hitShip) {
        if (grid != null) {
            let squareElement = grid.querySelector(`button[name="x${coordinate.xCoord}y${coordinate.yCoord}"]`);
            if (hitShip == true) {
                squareElement.hitState = "hitOne";
            }
            else if (hitShip == false) {
                squareElement.hitState = "missOne";
            }
        }
    }
    function updateAllSquareStates(grid) {
        if (grid != null) {
            for (rows = 13; rows > 0; rows--) {
                for (columns = 1; columns < 14; columns++) {
                    let squareElement = grid.querySelector(`button[name="x${columns}y${rows}"]`);
                    switch (squareElement.hitState) {
                        case "hitOne":
                            squareElement.hitState = "hitTwo";
                            break;
                        case "hitTwo":
                            squareElement.hitState = "hitThree";
                            break;
                        case "hitThree":
                            squareElement.hitState = "none";
                            break;
                        case "missOne":
                            squareElement.hitState = "missTwo";
                            break;
                        case "missTwo":
                            squareElement.hitState = "missThree";
                            break;
                        case "missThree":
                            squareElement.hitState = "none";
                            break;
                    }
                }
            }
        }
    }
    function updateSquareStatesStyle(grid) {
        if (grid != null) {
            for (rows = 13; rows > 0; rows--) {
                for (columns = 1; columns < 14; columns++) {
                    let squareElement = grid.querySelector(`button[name="x${columns}y${rows}"]`);
                    switch (squareElement.hitState) {
                        case "hitOne":
                            squareElement.classList.remove("hitOne", "hitTwo", "hitThree", "missOne", "missTwo", 'missThree');
                            squareElement.classList.add("hitOne");
                            break;
                        case "hitTwo":
                            squareElement.classList.remove("hitOne", "hitTwo", "hitThree", "missOne", "missTwo", 'missThree');
                            squareElement.classList.add("hitTwo");
                            break;
                        case "hitThree":
                            squareElement.classList.remove("hitOne", "hitTwo", "hitThree", "missOne", "missTwo", 'missThree');
                            squareElement.classList.add("hitThree");
                            break;
                        case "missOne":
                            squareElement.classList.remove("hitOne", "hitTwo", "hitThree", "missOne", "missTwo", 'missThree');
                            squareElement.classList.add("missOne");
                            break;
                        case "missTwo":
                            squareElement.classList.remove("hitOne", "hitTwo", "hitThree", "missOne", "missTwo", 'missThree');
                            squareElement.classList.add("missTwo");
                            break;
                        case "missThree":
                            squareElement.classList.remove("hitOne", "hitTwo", "hitThree", "missOne", "missTwo", 'missThree');
                            squareElement.classList.add("missThree");
                            break;
                        case "none":
                            squareElement.classList.remove("hitOne", "hitTwo", "hitThree", "missOne", "missTwo", 'missThree');
                            break;
                    }
                }
            }
        }
    }

    class AircraftCarrier {
        constructor() {
            this.name = "AircraftCarrier";
            this.size = 5;
            this.health = 5;
            this.currHealth = 5;
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
            this.health = 4;
            this.currHealth = 4;
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
            this.size = 4;
            this.health = 4;
            this.currHealth = 4;
            this.speed = 2;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.abilityName = `Missile`;
        }
    }
    class Battleship {
        constructor() {
            this.name = "Battleship";
            this.size = 5;
            this.health = 5;
            this.currHealth = 5;
            this.speed = 1;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.abilityName = `Bombardment`;
        }
    }
    class Frigate {
        constructor() {
            this.name = "Frigate";
            this.size = 3;
            this.health = 3;
            this.currHealth = 3;
            this.speed = 3;
            this.xCoord = undefined;
            this.yCoord = undefined;
            this.rotation = undefined;
            this.abilityName = `Scout`;
        }
    }

    // generates random number 1 - 13
    function rng() {
        let rng = Math.floor((Math.random() * 13) + 1);
        return rng;
    }


    // Generates a random coordinate and rotation for the ship, makes sure ship does not escape grid
    function randomCoord(inputShip) {
        // random rotation
        let randomNum = Math.random();
        if (randomNum < 0.5) {
            inputShip.rotation = "horizontal";
        }
        else {
            inputShip.rotation = "vertical";
        }
        // random coord
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
    function checkCoordValidity(shipList) {
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
    function randomCoordinatesAllShips(shipList) {
        for (let ship of shipList) {
            randomCoord(ship);
            while (checkCoordValidity(shipList) == false) {
                randomCoord(ship);
            }
        }
    }

    function moveShips(shipList) {
        for (ship of shipList) {
            let randomNum = Math.random();
            // 25% chance to rotate
            if (randomNum < 0.25) {
                // wont do the rotate if it messed up coordinate validity, otherwise will change rotation
                if (ship.rotation == "horizontal") {
                    ship.rotation = "vertical";
                    checkCoordValidity(shipList) ? ship.rotation = "vertical" : ship.rotation = "horizontal";
                }
                else if (ship.rotation == "vertical") {
                    ship.rotation = "horizontal";
                    checkCoordValidity(shipList) ? ship.rotation = "horizontal" : ship.rotation = "vertical";
                }
            }
            // 75% chance to move
            else {
                // wont move if it messed up coordinate validity. Can move the amount of squares equivalent to or less than ship.speed value in its rotations direction
                let shipMovementRange = Math.floor(Math.random() * (ship.speed - (ship.speed * -1) + 1)) + (ship.speed * -1);
                let prevXCoord = ship.xCoord;
                let prevYCoord = ship.yCoord;
                if (ship.rotation == "horizontal") {
                    ship.xCoord += shipMovementRange;
                }
                else if (ship.rotation == "vertical") {
                    ship.yCoord += shipMovementRange;
                }
                if (checkCoordValidity(shipList) == false || ship.xCoord < ship.size || ship.yCoord < ship.size || ship.xCoord > 13 || ship.yCoord > 13) {
                    ship.xCoord = prevXCoord;
                    ship.yCoord = prevYCoord;
                }
            }
        }
    }


});
