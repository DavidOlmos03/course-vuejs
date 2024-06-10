import { ref, computed, watch, watchEffect } from "vue";
import { defineStore } from "pinia";
import { collection, addDoc, runTransaction,doc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useCouponStore } from "./coupons";
import { getCurrentDate } from "@/helper";
export const useCartStore = defineStore('cart', ()=>{

    const coupon = useCouponStore()
    // Conexión a base de datos en firestore
    const db = useFirestore()
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
        // Utilizamos toFixed para dejar solo con 2 decimales, esto lo convierte en un string entonces utilizamos Number para convertir a número
        // NO se utiliza parseInt porque no queremos que quede en entero
        taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2))
        total.value = Number(((subtotal.value + taxes.value) - coupon.discount).toFixed(2))
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
    
    // Función para realizar la compra, enviando a firestore
    async function checkout(){
        try{
            // addDoc para agregar un "documento" a firestore, esto crea en colección de firestore un sales donde almacena los productos que se van comprando
            await addDoc(collection(db, 'sales'),{
                // Utilizo map para crear un nuevo arreglo o instancia
                items: items.value.map(item=>{
                    // creo el muevo arreglo sin availability y category
                    const {availability, category, ...data} = item
                    return data
                }),
                subtotal: subtotal.value,
                taxes: taxes.value, 
                discount: coupon.discount,
                total: total.value,
                date: getCurrentDate(),
            })
            // Sustraer cantidad de lo disponible
            items.value.forEach( async (item)=>{
                // Se procede a arealizar la transacción
                const productRef = doc(db, 'products', item.id)
                await runTransaction(db, async (transaction)=>{
                    const currentProduct = await transaction.get(productRef)
                    const availability = currentProduct.data().availability - item.quantity
                    console.log(availability)
                    transaction.update(productRef, {availability})
                })
            })

            // Reiniciar el state
            $reset()
            coupon.$reset()
        }catch(error){
            console.log(error)
        }
    }

    function $reset(){
        items.value = []
        subtotal.value = 0
        taxes.value = 0
        total.value = 0
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
        total,
        checkout
        
    }

})