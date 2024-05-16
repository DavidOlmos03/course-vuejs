import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword }  from 'firebase/auth'

export const useAuthStore = defineStore('auth', ()=>{
    const auth = useFirebaseAuth()

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
            console.log(errorCodes[error.code])
        })
    }


    return {
        login
    }

})

