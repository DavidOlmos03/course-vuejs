
<script setup>
    import { ref } from 'vue';
    import VueTailwindDatePicker from 'vue-tailwind-datepicker'
    import {useSalesStore} from '@/stores/sales'
    import SalesDetailsVue from '@/components/SalesDetails.vue';

    const sales = useSalesStore()

    const formatter = ref({
        date: 'DD/MM/YYYY',
        month: 'MMM'
    })

    console.log(sales.salesCollection)
</script>

<template>
    <div>
        <h1 class="text-4xl font-black my-10"> Resumen de Ventas </h1>
        <div class="md:flex md:items-start gap-5">
            <!-- Inicio muestra fecha -->
            <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-cente p-5">
                <VueTailwindDatePicker 
                    i18n="es-mx"
                    as-single
                    no-input
                    v-model="sales.date"
                    :formatter="formatter"
                />
            </div>
            <!-- Fin muestra fecha -->
            <!-- Inicio lista productos vendidos -->
            <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
               <p
                class="text-center text-lg"
                v-if="sales.isDateSelected"
               >
                Ventas de la fecha: <span class="font-black">{{ sales.date }}</span>
               </p>
               <p v-else
                class="text-center text-lg"
               >
                Selecciona una fecha
               </p>

               <!-- Para el cargue de los productos desde firestore -->
                <div class="space-y-5" v-if="sales.salesCollection.length">
                    <SalesDetailsVue 
                        v-for="sale in sales.salesCollection"
                        :key="sale.id"
                        :sale = "sale"
                    />
                </div>
                <p v-if="sales.noSales" class="text-lg text-center">No hay ventas en este día</p>

            </div>
            <!-- Fin lista productos vendidos -->

        </div>
    </div>
</template>


