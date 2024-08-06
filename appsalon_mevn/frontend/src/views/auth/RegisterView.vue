<script setup>
    // El inject es un tipo store para pasar datos de un componente padre a un componente hijo 
    // Es importante tener en cuenta que los inject no remplazan la funcionalidad que brinda Pinia
    import { inject } from 'vue'
    import { reset} from '@formkit/vue'
    import AuthAPI from '../../api/AuthAPI'

    // Este 'toast' viene de main.js
    const toast = inject('toast')
    
    const handleSubmit = async ({password_confirm,...formData})=>{
        try {
            // console.log(data)
            // Consultas exitosas en data (de la respuesta)
            const {data} = await  AuthAPI.register(formData)
            toast.open({
            message: data.msg,
            type:'success'
            })
            reset('registerForm')
        } catch (error) {
            // Consultas erroneas en response (de la respuesta)
            // console.log(error.response.data.msg)
            toast.open({
            message: error.response.data.msg,
            type:'error'
            })
        }
    }
</script>
<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
        <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalón</p>
        
        <FormKit
            id="registerForm"
            type="form"
            :actions="false"
            incomplete-message="No se pudo enviar, revisa las notificaciones"
            @submit="handleSubmit"
        > 
            <FormKit
                type="text"
                label="Nombre"
                name="name"
                placeholder="Tu Nombre"
                validation="required|length:3"
                :validation-messages="{
                    required: 'El Nombre es obligatorio',
                    length:'El nombre es muy corto'
                }"
            />
            <FormKit
                type="email"
                label="Email"
                name="email"
                placeholder="Email de Registro"
                validation="required|email"
                :validation-messages="{
                    required: 'El Email es obligatorio',
                    email:'Email no valido'
                }"
            />
            <FormKit
                type="password"
                label="Password"
                name="password"
                placeholder="Password de Usuario - Min 8 Caracteres"
                validation="required|length:8"
                :validation-messages="{
                    required: 'El Password es obligatorio',
                    length:'El Password debe contener al menos 8 caracteres'
                }"
            />
            <!-- Para utilizar confirm con FormKit el name debe tener la estructura que se muestra a continuación con el name del campo a comparar
             y la palabra confirm con un _ entre ellos -->
            <FormKit
                type="password"
                label="Repetir Password"
                name="password_confirm"
                placeholder="Repite el password"
                validation="required|confirm"
                :validation-messages="{
                    required: 'El Password es obligatorio',
                    confirm:'Los passwords no son iguales'
                }"
            />
            <FormKit type="submit">Crear Cuenta</FormKit>
        </FormKit>
    </div>
</template>
