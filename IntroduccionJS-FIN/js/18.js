// Operador de comparación

/**
 * La diferencia entre == y === es:
 * == no revisa el tipo de dato solo el valor
 * === SI revisa el tipo de datos, al igual que el valor
 */
let numero1 = 20
let numero2 = 20

if(numero1 === numero2) {
    console.log(' si son iguales ')
} else {
    console.log(' no, no son iguales')
}

//obs. 

let numero3 = 20
let numero4 = "20"

if(numero3 === numero4) {
    console.log(' si son iguales ')
} else {
    console.log(' no, no son iguales')
}

console.log(typeof numero3)
console.log(typeof numero4)