
function rng() {
    let rng = Math.floor(Math.random() * 100);
    // Generates a number 0 - 99
    do {
        rng += rng;
    } while (rng <= 0)
    // This loops runs until rng is not a zero
    // We want to generate a number from 1 - 20


    // This is a loops that subtracts 20 if the number is over 20
    // The loop will stop if it is 20 or less
    if (rng > 20) {
        do {
            rng = rng - 20;
        } while (rng > 20);


        return (rng);
    }
    else {
        return (rng);
    }
}
// console.log(rng())



class Ship {
    constructor(health,length,d,coord, newCoord) {
        this.health = health;
        this.length = length;
        this.direction = d;
        this.oldCoord = coord;
        this.newCoord = newCoord;
    }

    get long() {
        return 1;
    }
}

// This function uses the number generator to decide what direction the ships is going
function direction() {
    let d = rng();
    if (d <= 5) {
        return `up`;
    } else if (d <= 10) {
        return `down`;
    } else if (d <=15) {
        return `left`;
    } else {
        return `right`;
    }
}


// Avoid repeating by using class
// health, length, movement speed, directon, old coordinate, new coordinate 
let battleship = new Ship(5,5,direction(),coordinate(5),hey());


console.log(battleship)
console.log(battleship.oldCoord)


function coordinate(length) {
   
    let l = length;
    console.log(l)
    // Length of ship
    let x = rng()
    let y = rng()
    return [`x` + x + `y` + y];
   
}

function hey(){
    return `hi`
}
