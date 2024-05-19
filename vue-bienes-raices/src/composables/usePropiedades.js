import { ref, computed } from 'vue'
import {collection, doc, deleteDoc} from 'firebase/firestore'
import {useFirestore, useCollection, useFirebaseStorage} from 'vuefire'
import { ref as storageRef, deleteObject} from 'firebase/storage'

export default function usePropiedades(){
    const alberca = ref(false)

    const storage = useFirebaseStorage()

    // Conecta y hace la peticion a firebase
    const db = useFirestore()
    // Se accede a la información que se encuentra en firebase, el propiedadesCollection es por convencion de firebase
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    async function deleteItem(id, urlImage){
        if(confirm('¿Deseas eliminar esta propiedad?')){
            const docRef = doc(db, 'propiedades', id)
            const imageRef = storageRef(storage, urlImage)

            // De esta forma se ejecutan los awaits al mismo tiempo 
            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])
            // De esta forma se ejecutan los await por separado
            // await deleteDoc(docRef)
            // await deleteObject(imageRef)
        }
    }

    const filteredItems = computed(()=>{
        return alberca.value ? 
        propiedadesCollection.value.filter(propiedad => propiedad.alberca) : 
        propiedadesCollection.value
    })

    return {
        alberca,
        propiedadesCollection,
        filteredItems,
        deleteItem
    }

}