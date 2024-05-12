
<script setup>
    import { onMounted, reactive,ref } from 'vue';
    import { FormKit } from '@formkit/vue'
    import { useRouter, useRoute } from 'vue-router';
    // import axios from '../lib/axios';
    import ClienteService from '@/services/ClienteService';
    import RouterLink from '../components/UI/RouterLink.vue'
    import Heading from '../components/UI/Heading.vue'

   

    const route = useRoute() //Información de la página actual, incluyendo obtener algun parametro de la url
    const router = useRouter()  // Información y redireccionamiento general del proyecto o aplicación web

    const {id} = route.params
    
    //forma 1
    const formData = reactive({
        //aqui puedo poner cada uno de los elementos como nombre = '' o dejarlo simplemente como un objeto vacio
    })  
    //forma 2
    //const formData = ref({})
    onMounted(()=>{
        
        ClienteService.obtenerCliente(id)
        .then(({data})=>{
            // formData.nombre = data.nombre de esta forma se pueden pasar cada uno de los datos o tambien se puede hacer de la siguiente manera
            // forma 1
            Object.assign(formData, data)
            // forma 2
            // formData.value = data
        })
        .catch( error=> console.log(error))
    })
    defineProps({
        titulo:{
            type:String,
            required:true
        }
    })
    
   
    const handleSubmit = (data)=>{
       ClienteService.actualizarCliente(id, data)
    //    .then(data => console.log(data))
    //    .catch(error => console.log(error))
    }
</script>

<template>
    <div>
        <div class="flex justify-end">
            <RouterLink 
            to='listado-clientes'>
                Volver
            </RouterLink>
        </div>
        
        <Heading>
            {{titulo}}
        </Heading>
        <div class="mx-auto mt-10 bg-white shadow">
            <div class="mx-auto md:w-2/3 py-20 px-6">
                <FormKit
                type="form"
                submit-label="Editar Cliente"
                incomplete-message="No se pudo enviar, revisa los mensajes"
                @submit="handleSubmit"
                :value="formData"
            >

                <FormKit 
                    type="text"
                    label="Nombre"
                    name="nombre"
                    placeholder="Nombre del Cliente"
                    validation="required"
                    :validation-messages="{required: 'El nombre del cliente es obligatorio' }"
                    v-model="formData.nombre"
                />
                <FormKit 
                    type="text"
                    label="Apellido"
                    name="apellido"
                    placeholder="Apellido del Cliente"
                    validation="required"
                    :validation-messages="{required: 'El apellido del cliente es obligatorio' }"
                    v-model="formData.apellido"
                />
                <FormKit 
                    type="text"
                    label="Email"
                    name="email"
                    placeholder="Email del Cliente"
                    validation="required|email"
                    :validation-messages="{required: 'El email del cliente es obligatorio',email:'Ingresa un email valido' }"
                    v-model="formData.email"
                />
                <FormKit 
                    type="text"
                    label="Teléfono"
                    name="telefono"
                    placeholder="Teléfono: XXX-XXX-XXXX"
                    validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                    :validation-messages="{matches:'El formato no es válido'}"
                    v-model="formData.telefono"
                />
                <FormKit 
                    type="text"
                    label="Empresa"
                    name="empresa"
                    placeholder="Empresa del Cliente"
                    v-model="formData.empresa"
                />
                <FormKit 
                    type="text"
                    label="Puesto"
                    name="puesto"
                    placeholder="Puesto del Cliente"
                    v-model="formData.puesto"
                />

            </FormKit>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .formkit-wrapper{
        max-width: 100%;
    }
</style>