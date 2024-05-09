import { ref,reactive,onMounted, computed } from 'vue';

export default function useCripto(){
    
    const criptomonedas = ref([])

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'COP', texto: 'Peso Colombiano'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])
    const cotizacion = ref({}) //En este caso en particular se crea como ref y no con reactive dado que asi sea un objeto, no sabemos con certeza
                            //Como va a ser la respuesta de la API y además esta es muy larga
    const cargando = ref(false)
    onMounted(()=>{
        //Hecho con fetch - promesas (Igual que obtenerCotizacion)
    
          const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
          fetch (url)
            .then(respuesta => respuesta.json())
            .then(({Data}) =>criptomonedas.value = Data)
        }
    )

    const obtenerCotizacion =async(cotizar)=>{
        //Hecho con async - await (igual que el que esta dentro del onMounted)
        cargando.value = true
        cotizacion.value =  {}
        try {
          const {moneda, criptomoneda} = cotizar
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
          
          const respuesta = await fetch(url)
          const data = await respuesta.json()
          cotizacion.value = data.DISPLAY[criptomoneda][moneda]
        } catch (error) {
          console.log(error)
        } finally {
          cargando.value = false
        }
       
      }

      const mostrarResultado = computed(()=>{
        return Object.values(cotizacion.value).length > 0
      })

    return{
        monedas,
        criptomonedas,
        cotizacion,
        cargando,
        obtenerCotizacion,
        mostrarResultado

    }
}