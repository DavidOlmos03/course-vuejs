
<script setup>
    // import '@formkit/themes/genesis'
    import { FormKit } from '@formkit/vue'
    import { useRouter } from 'vue-router';
    // import axios from '../lib/axios';
    import ClienteService from '@/services/ClienteService';
    import RouterLink from '../components/UI/RouterLink.vue'
    import Heading from '../components/UI/Heading.vue'
    // import config  from '../formkit.config.js'

     // const route = useRoute() //Información de la página actual, incluyendo obtener algun parametro de la url
    const router = useRouter()  // Información y redireccionamiento general del proyecto o aplicación web
    defineProps({
        titulo:{
            type:String,
            required:true
        }
    })
    
   
    const handleSubmit = (data)=>{
        data.estado = 1
        ClienteService.agregarCliente(data)
        .then(respuesta => {
            // console.log(respuesta)

            // Redireccionar
            router.push({name:'listado-clientes'})

        })
        .catch(error => console.log("error"))
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
                    submit-label="Agregar Cliente"
                    incomplete-message="No se pudo enviar, revisa los mensajes"
                    @submit="handleSubmit"
                >

                    <FormKit 
                        type="text"
                        label="Nombre"
                        name="nombre"
                        placeholder="Nombre del Cliente"
                        validation="required"
                        :validation-messages="{required: 'El nombre del cliente es obligatorio' }"
                    />
                    <FormKit 
                        type="text"
                        label="Apellido"
                        name="apellido"
                        placeholder="Apellido del Cliente"
                        validation="required"
                        :validation-messages="{required: 'El apellido del cliente es obligatorio' }"
                    />
                    <FormKit 
                        type="text"
                        label="Email"
                        name="email"
                        placeholder="Email del Cliente"
                        validation="required|email"
                        :validation-messages="{required: 'El email del cliente es obligatorio',email:'Ingresa un email valido' }"
                    />
                    <FormKit 
                        type="text"
                        label="Teléfono"
                        name="telefono"
                        placeholder="Teléfono: XXX-XXX-XXXX"
                        validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                        :validation-messages="{matches:'El formato no es válido'}"
                    />
                    <FormKit 
                        type="text"
                        label="Empresa"
                        name="empresa"
                        placeholder="Empresa del Cliente"
                    />
                    <FormKit 
                        type="text"
                        label="Puesto"
                        name="puesto"
                        placeholder="Puesto del Cliente"
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