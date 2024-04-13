// Scope   (Cuando una variable vive unicamente dentro de una función, como es el caso de la segunda parte de este ejercicio)

let precio = 300

function unaFuncion() {
    precio = 100
    console.log(precio)
}
unaFuncion()
console.log(precio)

console.log("-----------------------------")

let precio2 = 300

function unaFuncion2() {
    let precio2 = 100
    console.log(precio2)
}
unaFuncion()
console.log(precio2)