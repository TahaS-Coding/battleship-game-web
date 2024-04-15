function a() {
    let a = 0;
    let b = 0;
    let array = [];
    for (let i = 0; i < 3; i++) {
        a += i;
        for (let i = 0; i < 3; i++) {
            array.push(`x${a}y${b + (i)}`)
        }
    }
    console.log(array)

}
a()