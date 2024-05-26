import { defineStore } from "pinia";
import { computed } from "vue";
import { useFirestore } from "vuefire";
import { collection, addDoc } from "firebase/firestore";

export const useProductsStore = defineStore('products',()=>{

    const db = useFirestore()
    const categories = [
        {id:1, name:'Sudaderas'},
        {id:2, name:'Tenis'},
        {id:3, name:'Lentes'}
    ]

    async function createProduct(product){
        await addDoc(collection(db, 'products'), product)
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
    return{
        createProduct,
        categoryOptions
    }
} )