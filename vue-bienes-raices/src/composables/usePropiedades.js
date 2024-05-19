import { ref, computed } from 'vue'
import {collection} from 'firebase/firestore'
import {useFirestore, useCollection} from 'vuefire'


export default function usePropiedades(){
    const alberca = ref(false)
    // Conecta y hace la peticion a firebase
    const db = useFirestore()
    // Se accede a la información que se encuentra en firebase, el propiedadesCollection es por convencion de firebase
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    const propiedadesFiltradas = computed(()=>{
        return alberca.value ? 
        propiedadesCollection.value.filter(propiedad => propiedad.alberca) : 
        propiedadesCollection.value
    })

    return {
        alberca,
        propiedadesCollection,
        propiedadesFiltradas
    }

}