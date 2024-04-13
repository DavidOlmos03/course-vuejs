const tecnologias = ['Vue.js', 'JavaScript', 'Node.js', 'HTML', 'CSS']

// tecnologias.push('Git') // añade elemento al final del arreglo
// tecnologias.unshift('Git') // añade elemento al inicio del arreglo

// tecnologias.pop() // elimina elemento del final del arreglo
// tecnologias.shift() // Elimina del inicio del arreglo

// tecnologias.splice(0,1) 


//function(tech) {return tech !== 'HTML'} recibe cada elemento del array tecnologias, lo llama como "tech" y crea el nuevo
//array tecnologias2 con los tech !== 'HTML'.
const tecnologias2 = tecnologias.filter( function(tech) {
    return tech !== 'HTML'
})


console.log(tecnologias2)