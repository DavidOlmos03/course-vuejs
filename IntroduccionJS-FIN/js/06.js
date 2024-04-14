// Destructuring de 2 o más objetos
//Puede ser util a la hora de traer datos de una API y no querer ir a ella para cambiar el nombre de los campos
const producto = {
    nombre : "Tablet",
    precio : 300,
    disponible : true
}

const cliente = {
    nombre: 'Juan',
    premium: true
}
//Se crea una const nombreProducto con el valor de "nombre" que esta en el objeto "producto"

const { nombre: nombreProducto } = producto
const { nombre: nombreCliente } = cliente

console.log(nombreProducto)
console.log(nombreCliente)
