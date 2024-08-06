<script setup>
    import { useUserStore } from '@/stores/user';
    const user = useUserStore()

    // console.log(user.getUserName)
</script>

<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-2xl lg:text-6xl font-black text-white">App Salón</h1>
            <div class="flex flex-col space-y-5">
                <div class="flex gap-2 items-center">
                    <p class="text-white text-right">Hola: {{user.getUserName}}</p>
                    
                    <button
                        type="button"
                        class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
                        @click="user.logout"
                    >
                        Cerrar Sesión
                    </button>
                </div>
                <nav class="flex gap-2 items-center justyfy-end">
                    <RouterLink
                        :to="{name:'my-appointments'}"
                        class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg"
                    >
                    Mis citas
                    </RouterLink>

                    <RouterLink
                        :to="{name:'new-appointment'}"
                        class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg bg-blue-700"
                        >
                        Nueva Cita
                    </RouterLink>
                </nav>
            </div>
        </div>       
        <main>
            <RouterView/>
        </main>        
    </div>
</template>

