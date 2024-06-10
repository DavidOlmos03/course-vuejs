import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";

export const useCouponStore = defineStore('coupon', ()=>{

    const cart = useCartStore()
    // Variable para almacenar el input
    const couponInput = ref('')

    // Para la validación del cupón ingresado
    const couponValidationMessage = ref('')

    // Para el porcentaje que se estará descontando como descuento
    const discountPercentage = ref(0)

    // Descuento real
    const discount = ref(0)

    // Se crea el array de los cupones validos
    const VALID_COUPONS = [
        {name: '10DESCUENTO', discount: .10},
        {name: '20DESCUENTO', discount: .20},
    ]
    // Observamos el cambio en discountPercentage
    watch(discountPercentage,()=>{
        discount.value = (cart.total * discountPercentage.value).toFixed(2)
        console.log(cart.total)
        console.log(discountPercentage.value)
        console.log(discount.value)
    })
    // Función para aplicar el cupon en caso de que el ingresado exista en el arreglo VALID_COUPONS
    function applyCoupon(){
        if (VALID_COUPONS.some(coupon => coupon.name === couponInput.value)) {
            couponValidationMessage.value = "Aplicando..."

            setTimeout(()=>{
                // Se extrae el atributo discount de VALID_COUPONS donde en name coincida con el name ingresado por el usuario
                discountPercentage.value = VALID_COUPONS.find(coupon => coupon.name === couponInput.value).discount
                couponValidationMessage.value = "Descuento Aplicado!"
            },3000)

        }else{
            couponValidationMessage.value = "No existe ese cupón"
        }

        setTimeout(()=>{
            couponValidationMessage.value = ''
        },6000)
    }

    function $reset(){
        couponInput.value = ''
        couponValidationMessage.value = ''
        discountPercentage.value = 0
        discount.value = 0
    }
    // Para verificar si ya se aplico un descuento 
    const isValidCoupon = computed(()=> discountPercentage.value > 0)

    return {
        couponInput,
        discount,
        applyCoupon,
        couponValidationMessage,
        isValidCoupon,
        $reset
    }
})