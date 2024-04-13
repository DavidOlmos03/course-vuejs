// Optional chaining o encadenamiento opcional

const alumno = {
    nombre: 'Juan',
    clase: 'Programación 1',
    aprobado: true
}
/**
 * Esta función se ejecuta despues de los milisegundos establecidos, ie espera hasta que pasen los milisegundos y se ejecuta, pero la ejecución del código
 * sigue con normalidad
 */
setTimeout(() => {
    alumno.examenes = {
        examen1: 100,
        examen2: 90,
        examen3: 100,
    }
    console.log(alumno.examenes?.examen1)  //Si existe examenes dentro de alumno, entonces busca examen1 de lo contrario no hace nada
}, 3000);

console.log(alumno.examenes?.examen1)
console.log('Hola Mundo')