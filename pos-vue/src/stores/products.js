import { defineStore } from "pinia";
import { computed } from "vue";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import { collection, addDoc, where, query, limit, orderBy, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref as storageRef, deleteObject} from 'firebase/storage'

export const useProductsStore = defineStore('products',()=>{

    // Credenciales para hacer uso de la base de datos
    const db = useFirestore()
    // Credenciales para hacer uso del Storage
    const storage = useFirebaseStorage()


    const categories = [
        {id:1, name:'Sudaderas'},
        {id:2, name:'Tenis'},
        {id:3, name:'Lentes'}
    ]

    const q = query(
        collection(db, 'products'),
        // where, limit, orderBy
        orderBy('availability','asc')
    )

    const productsCollection = useCollection( q )

    async function createProduct(product){
        await addDoc(collection(db, 'products'), product)
    }

    async function updateProduct(docRef,product){
        // console.log(product)
        // Se extraen los valores ie se exceptua la imagen y url(por si no exite imagen nueva entonces que solo haga los cambios en los otros campos), de product
        const { image , url , ...values} = product 
        if (image.length) {
            await updateDoc(docRef, {
                ...values,
                image: url.value
            })
        }else{
            await updateDoc(docRef, values)
        }
        // console.log(url.value)
    }

    async function deleteProduct(id){
        if (confirm("¿Eliminar producto?")) {
            // Referencia al documento
            const docRef = doc(db, 'products', id)     
            const docSnap = await getDoc(docRef)
            const {image} = docSnap.data()

            // Referencia a la imagen
            const imageRef = storageRef(storage, image)

            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])

        }
    }

    // Computed para organizar la estructura que espera formKit para poder utilizar nuestros valores de id y name en categories
    const categoryOptions = computed(() => {
        const options = [
            // attrs para definir los atributos  {disabled: true} no permite que escoja a Seleccione como una de las categorias
            {label:'Seleccione', value:'', attrs:{disable:true}},
            ...categories.map(category => (
                { label: category.name, value: category.id }
            ))
        ]

        return options
    })

    const noResults = computed(()=> productsCollection.value.length === 0)

    const filteredProducts = computed(()=>{
        return productsCollection.value
    })

    return{
        createProduct,
        updateProduct,
        deleteProduct,
        productsCollection,
        categoryOptions,
        noResults,
        filteredProducts
    }
} )