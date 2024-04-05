
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



class ship {
    constructor(d,coord, newCoord) {
        this.direction = d;
        this.length = 5;
        this.oldCoord = coord;
        this.newCoord = newCoord;
    }

    get long() {
        return this.long;
    }

    get nCoord() {
        return this.newCoord;
    }

    get oCoord() {
        return this.oldCoord;
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

// console.log(direction())

function coordinate(length) {
    let l = length;
    // Length of ship
    let x = rng()
    let y = rng()
    return [`x` + x + `y` + y];
}
let ship1 = new ship(direction(),coordinate(ship.long));
console.log(ship1)
