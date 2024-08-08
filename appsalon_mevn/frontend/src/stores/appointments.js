import { ref, computed, onMounted, inject, watch } from 'vue'
import { defineStore} from 'pinia'
import AppointmentAPI from '@/api/AppointmentAPI'
import { convertToISO } from '@/helpers/date'
import { useRouter } from 'vue-router'


export const useAppointmentsStore = defineStore('appointments',()=>{

    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')
    const appointmentsByDate = ref([])

    const toast = inject('toast')
    const router = useRouter()

    onMounted(()=>{
        const startHour = 10
        const endHour = 19
        for(let hour = startHour; hour <= endHour; hour++){
            hours.value.push(hour+':00')
        }
    })
    
    watch(date, async ()=>{
        time.value = ''
        // Este if es para controlar un error que se genera por pasar una fecha incorrecta
        if (date.value === '') return
        // Obtenemos las citas
        const {data} = await AppointmentAPI.getByDate(date.value)
        appointmentsByDate.value = data

        console.log(data)
    })
    // Funciones
    function onServiceSelected(service){
        if (services.value.some(selectedService => selectedService._id === service._id)) {
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        } else {
            if (services.value.length == 2) {
                alert('Máximo 2 servicios por cita')
                return
            }
            services.value.push(service)
        }


    }

    // Estos datos deben tambien pertenecer al modelo Appointments en el backend
    async function createAppointment() { 
        const appointment = {
            services: services.value.map( service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }

        const {data} = await AppointmentAPI.create(appointment)
        try {

            toast.open({
                message: data.msg,
                type: 'success'
            })
            clearAppointmentData()
            router.push({name:'my-appointments'})
        } catch (error) {
            console.log(error)
            // toast.open({
            //     message: error.response.data.msg,
            //     type: 'error'
            // })
        }

    }

    function clearAppointmentData(){       
        services.value = []
        date.value = ''
        time.value = ''
    }

    // Constantes (computed properties)
    const noServicesSelected = computed(()=> services.value.length === 0)

    const isServiceSelected = computed(()=>{
        return (id) => services.value.some(service => service._id === id)
    })


    const totalAmount = computed(()=>{
        return services.value.reduce((total, service) => total + service.price, 0)
    })


    const isValidReservation = computed(()=>{
        return services.value.length && date.value.length && time.value.length
    })

    const isDateSelected = computed(()=>{
        return date.value ? true : false
    })

    const disableTime = computed(()=>{
        return (hour)=>{
            return appointmentsByDate.value.find(appointment => appointment.time == hour)
        }
    })
    return {
        onServiceSelected, 
        isServiceSelected,
        services,
        date,
        hours,
        time,
        totalAmount,
        noServicesSelected,
        isValidReservation,
        createAppointment,
        isDateSelected,
        disableTime
    }
})