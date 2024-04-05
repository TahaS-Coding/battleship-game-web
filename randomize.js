
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
    constructor() {
        this.x = [0];
    }


    get xCoord() {
        return this.x;
    }
}




let ship1 = new ship();
console.log(ship1.xCoord)




function coordinate(nShips) {
    let n = nShips;
    // Number of ships
    let ship1 = new ship();
    console.log(ship1.xCoord)
}
coordinate()