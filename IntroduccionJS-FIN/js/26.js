const inputNombre = document.querySelector('#nombre')
//const inputPassword = document.querySelector('#password')
const heading = document.querySelector('.heading')

inputNombre.addEventListener('input', (e) => {
    heading.textContent = e.target.value
})
/*
inputPassword.addEventListener('input', () => {
    inputPassword.type = 'text'

    setTimeout(() => {
        inputPassword.type = 'password'
    }, 300);
})

*/
const enterPassword = document.querySelector('#password')

enterPassword.addEventListener('input',()=>{
    enterPassword.type = 'text'
    setTimeout(
        ()=>{
            enterPassword.type = 'password'
            
        },300)
    })


