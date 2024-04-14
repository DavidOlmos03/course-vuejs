const tecnologias = ['Vue.js', 'JavaScript', 'Node.js', 'HTML', 'CSS', 'Git']
const numeros = [10, 20, 30]

// Includes
let resultado = tecnologias.includes('CSS')
console.log(resultado)
// FindIndex
resultado = tecnologias.findIndex(tech => tech === 'Git')
console.log(resultado)
/*
resultado = tecnologias.findIndex(function(tech){if(tech==='Git'){return true}})
console.log(resultado)*/
// Some 
resultado = numeros.some(numero => numero > 45)
console.log(resultado)
// Find
resultado = numeros.find(numero => numero === 12)
console.log(resultado)
// Every
resultado = numeros.every(numero => numero > 9)
console.log(resultado)
// Reduce     //Me permite aplicar una función a cada uno de los elementos del array de forma recursiva, con un valor inicial de 0 en este caso
resultado = numeros.reduce( (total, numero) => numero + total, 0)
console.log(resultado)

resultado = tecnologias.filter( tech => tech !== 'Vue.js')


console.log(resultado)