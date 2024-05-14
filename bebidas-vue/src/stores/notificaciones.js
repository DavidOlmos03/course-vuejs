import { ref, watch,watchEffect } from "vue";
import { defineStore } from "pinia";

export const useNotificacionStore = defineStore('notificacion',()=>{
    const texto = ref('')
    const error = ref(false)
    const mostrar = ref(false)

    watchEffect(()=>{   // watchEffect es mas general que solo watch, pues el primero observa todo lo que esta dentro del arrow function, encambio el watch solo observa el que se indica
        if (mostrar.value) {
        setTimeout(()=>{
            texto.value = ''
            error.value = false
            mostrar.value = false
        }, 3000)
        }
    })
    // function $reset() {
    //     texto.value = ''
    //     error.value = false
    //     mostrar.value = false
    // }
    return{
        texto,
        error,
        mostrar
    }
})