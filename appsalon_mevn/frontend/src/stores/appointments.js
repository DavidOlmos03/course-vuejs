import { ref, computed, onMounted, inject, watch } from 'vue'
import { defineStore} from 'pinia'
import AppointmentAPI from '@/api/AppointmentAPI'
import { convertToISO, converToDDMMYYYY } from '@/helpers/date'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

export const useAppointmentsStore = defineStore('appointments',()=>{

    const appointmentId = ref('')
    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')
    const appointmentsByDate = ref([])

    const toast = inject('toast')
    const router = useRouter()
    const user = useUserStore()


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
        
        // console.log(data)
        if (appointmentId.value) {
            // console.log("Edicion")
            appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value)
            time.value = data.filter(appointment => appointment._id === appointmentId.value)[0].time
            
        }else{
            // console.log('registro nuevo')
            appointmentsByDate.value = data
        }
    })
    // Funciones
    function setSelectedAppointment(appointment){
        console.log(appointment)
        services.value = appointment.services
        date.value = converToDDMMYYYY(appointment.date)
        time.value = appointment.time
        appointmentId.value = appointment._id

        
    }

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
    async function saveAppointment() { 
        const appointment = {
            services: services.value.map( service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }

        if (appointmentId.value) {
            // Se edita una cita ya existente
            try {
                const {data} = await AppointmentAPI.update(appointmentId.value, appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            // Se crea una nueva cita
            try {
                const {data} = await AppointmentAPI.create(appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
            } catch (error) {
                console.log(error)
                // toast.open({
                //     message: error.response.data.msg,
                //     type: 'error'
                // })
            }
        }
        // Se limpian los datos
        clearAppointmentData()
        // Se obtiene las citas del usuario con los cambios hechos
        user.getUserAppointments()
        // Se redirecciona al usuario
        router.push({name:'my-appointments'})


    }

    function clearAppointmentData(){   
        appointmentId.value = ''    
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
        setSelectedAppointment,
        onServiceSelected, 
        isServiceSelected,
        services,
        date,
        hours,
        time,
        totalAmount,
        noServicesSelected,
        isValidReservation,
        saveAppointment,
        clearAppointmentData,
        isDateSelected,
        disableTime
    }
})