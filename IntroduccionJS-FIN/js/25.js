const heading = document.querySelector('.heading')
const enlaces = document.querySelectorAll('.navegacion a')

heading.addEventListener('dblclick', () => {   //click and dblclick
    // const numero = 2
    // if(numero === 10) {
    //     heading.textContent = 'Mi numero es 10'
    // } else {
    //     heading.textContent = 'El numero es diferente'
    // }

    heading.textContent = 'Nuevo heading al dar click'
})

enlaces.forEach(enlace => {
    enlace.addEventListener('click', (evento) => {
        evento.preventDefault()  //Previene la acción por defecto del evento, en este caso es no hacer el salto de linea causado por el href
        enlace.textContent = 'Nuevo Nombre'
    })
})
