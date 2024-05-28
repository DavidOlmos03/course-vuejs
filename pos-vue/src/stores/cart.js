import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', ()=>{

    const items = ref([])

    const MAX_PRODUCTS = 5

    function addItem(item){
        // Se extraen quantity y id para poder tenerlos en updateQuantity
        items.value.push({...item, quantity: 1, id: item.id})
        // console.log(items)
    }

    function updateQuantity(id, quantity){
        // map no modifica el arreglo original, solo crea un nuevo objeto
        // si item.id === id entonces sobreescribe quantity de lo contrario se mantiene igual
       items.value = items.value.map(item => item.id === id ? {...item, quantity} : item)
    }
    const isEmpty =  computed(()=> items.value.length === 0)

    const checkProductAvailability = computed(()=>{
        return (product) => product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS
    })
    return{
        checkProductAvailability,
        updateQuantity,
        addItem,
        isEmpty,
        items,
        
    }

})