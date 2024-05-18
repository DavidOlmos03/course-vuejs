import { computed } from 'vue'
import {collection} from 'firebase/firestore'
import {useFirestore, useCollection} from 'vuefire'


export default function usePropiedades(){
    // Conecta y hace la peticion a firebase
    const db = useFirestore()
    // Se accede a la información que se encuentra en firebase, el propiedadesCollection es por convencion de firebase
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    const propertyPrice = computed(()=>{
        return (price)=>
            // console.log(price)
            Number(price).toLocaleString('en-US',{
                style:'currency',
                currency:'USD'
            })
        
    })
    return {
        propiedadesCollection,
        propertyPrice
    }

}