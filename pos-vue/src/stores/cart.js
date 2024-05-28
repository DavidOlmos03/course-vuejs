import { ref, computed, watch, watchEffect } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', ()=>{

    const items = ref([])
    const subtotal = ref(0)
    const taxes = ref(0)
    const total = ref(0)

    const MAX_PRODUCTS = 5
    const TAX_RATE = .10


    // watch(items, ()=>{
    //     subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
    //     taxes.value = subtotal.value * TAX_RATE
    //     total.value = subtotal.value + taxes.value
    // },{
    //     deep:true
    // })

    watchEffect(()=>{
        subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
        taxes.value = subtotal.value * TAX_RATE
        total.value = subtotal.value + taxes.value
    })

    function addItem(item){
        const index = isItemInCart(item.id)
        if(index >= 0){
            if (isProductAvailable(item, index)){
                alert('Has alcanzado el limite')
                return
            }
            // Actualizar la cantidad
            items.value[index].quantity++
        }else{
            // Se extraen quantity y id para poder tenerlos en updateQuantity
            items.value.push({...item, quantity: 1, id: item.id})
        }
        
        // console.log(items)
    }

    function updateQuantity(id, quantity){
        // map no modifica el arreglo original, solo crea un nuevo objeto
        // si item.id === id entonces sobreescribe quantity de lo contrario se mantiene igual
       items.value = items.value.map(item => item.id === id ? {...item, quantity} : item)
    }
    
    function removeItem(id){
        items.value = items.value.filter(item => item.id !== id)
    }

    const isItemInCart = id => items.value.findIndex(item => item.id === id)
    const isProductAvailable = (item, index) => {
        return items.value[index].quantity >= item.availability || items.value[index].quantity >= MAX_PRODUCTS
    }

    const isEmpty =  computed(()=> items.value.length === 0)

    const checkProductAvailability = computed(()=>{
        return (product) => product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS
    })
    return{
        checkProductAvailability,
        updateQuantity,
        removeItem,
        subtotal,
        addItem,
        isEmpty,
        items,
        taxes,
        total
        
    }

})