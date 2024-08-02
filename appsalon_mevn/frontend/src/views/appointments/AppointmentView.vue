<script setup>
    import SelectedService from '../../components/SelectedService.vue'
    import {useAppointmentsStore} from '../../stores/appointments'
import { formatCurrency } from '@/helpers';

    const appointments = useAppointmentsStore()

</script>

<template>
    <div>
        <h2 class="text-4xl font-extrabold text-white">Detalles Cita y Resumen</h2>
        <p class="text-white text-lg mt-5">A continuación verifica la información y confirma tu cita</p>

        <h3 class="text-3xl font-extrabold text-white">Servicios</h3>
        <p v-if="appointments.noServicesSelected" class="text-center text-white text-2xl">
            No hay servicios seleccionados
        </p>
        <div class="grid gap-5" v-else>
            <SelectedService
                v-for="service in appointments.services"
                :key="service._id"
                :service="service"
            />

            <p class="text-right text-white text-2xl">
                <span class="font-black">Total a pagar: {{ formatCurrency(appointments.totalAmount) }}</span>
            </p>
        </div>

    </div>
</template>


