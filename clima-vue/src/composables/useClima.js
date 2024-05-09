import axios from 'axios'
import {computed, ref} from 'vue'

export default function useClima(){
    const clima = ref({})
    const cargando = ref(false)
    const error = ref('')

    const obtenerClima = async ({ciudad,pais})=>{
        //Importar el Api Key (mediante las variables de entorno)
        const key = import.meta.env.VITE_API_KEY

        //Obtener la latitud y longitud
        // const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`
        cargando.value = true
        clima.value = {}   //Se reinicia para controlar lo que se muestra o no en el app
        error.value = ''    // ""  "" "" ...
        try {
            
            const url =  `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`
            const {data} = await axios(url)
            const { lat, lon} = data[0]  //Aplicamos destruction 

            //Obtener clima
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
            const {data:resultado} = await axios(urlClima)  //aplique destruction y luego renombre a data:resultado 
            clima.value = resultado
        } catch {
            error.value = 'Ciudad no encontrada'
        }finally{
            cargando.value = false
        }

        //Obtener el clima
        

    }
    const mostrarClima =  computed(()=>{
        
        return Object.values(clima.value).length > 0
    })

    const formatearTemperatura = temperatura => parseInt(temperatura - 273.15)
    return {
        obtenerClima,
        clima,
        mostrarClima,
        formatearTemperatura, 
        cargando,
        error
    }
}
