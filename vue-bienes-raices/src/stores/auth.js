import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword }  from 'firebase/auth'
import {ref, computed} from 'vue'


export const useAuthStore = defineStore('auth', ()=>{
    const auth = useFirebaseAuth()

    const errorMsg = ref('')
    const errorCodes = {
        'auth/invalid-credential' : 'Credenciales invalidas'
    }
    const login = ({email,password})=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            // const user = userCredential.user
            console.log(userCredential)
        })
        .catch((error)=>{
            errorMsg.value = errorCodes[error.code]
        })
    }

    const hasError = computed(()=>{
        setTimeout(()=>{
            errorMsg.value = '' 
        },3000)
        return errorMsg.value
    })

    return {
        login,
        hasError,
        errorMsg
    }

})

