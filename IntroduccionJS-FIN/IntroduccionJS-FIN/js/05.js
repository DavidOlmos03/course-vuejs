/**Obs.
 * Objetos  {}
 * arrays []
 */
const producto = {
    nombre : "Tablet",
    precio : 300,
    disponible : true
}
Object.freeze(producto) //permite solo lectura
console.log(producto)
// Object.freeze(producto)
// Object.seal(producto)

// Reescribir un valor
producto.nombre = "Monitor Curvo"

// Añadir un valor 
producto.imagen = "imagen.jpg"

delete producto.disponible
//Para crear el objeto producto2 sin los elementos que se colocan entre las llaves, a partir de producto
const { disponible, precio, ...producto2 } = producto

console.log(producto2) 