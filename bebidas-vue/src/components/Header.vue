
<script setup>
    import { computed } from 'vue'
    import {RouterLink, useRoute} from 'vue-router'
    import {useBebidaStore} from '../stores/bebidas'


    const route = useRoute()
    const store = useBebidaStore()   // OBS. Es importante aqui al llamar el store nunca aplicar destruction {}, porque esto rompería la reactividad

    const paginaInicio = computed(()=> route.name === 'inicio')

    const handleSubmit = ()=>{
        // console.log('Enviando..')
        console.log(store.obtenerRecetas())
        //TO DO
    }
</script>
<template>
   <header
    class="bg-slate-800"
    :class="{header:paginaInicio}"
   >
        <div class="mx-auto container px-5 py-16">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink
                    :to = "{name:'inicio'}"
                    >
                        <img class="w-32" src="/img/logo.svg"  alt="">
                    </RouterLink>
                </div>
                <nav class="flex gap-4 text-white">  <!--gap-4 para separar elementos-->
                    <RouterLink 
                    :to="{name:'inicio'}"
                    class="uppercase font-bold"
                    active-class="text-orange-500"
                    >
                        <h6>Inicio</h6>
                    </RouterLink>
                    <RouterLink 
                    :to="{name:'favoritos'}"
                    class="uppercase font-bold"
                    active-class="text-orange-500"
                    >
                        <h6>Favoritos</h6>
                    </RouterLink>
                </nav>
            </div>
            <form
            class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
            v-if="paginaInicio"
            @submit.prevent="handleSubmit"
        >
            <div class="space-y-4">  <!--Agrega separación a los elementos hijos-->
                <label 
                class="block text-white uppercase font-extrabold text-lg"
                for="ingredientes">Nombre o Ingredientes</label>
                <input 
                    id="ingrediente"
                    type="text"
                    class="p-3 w-full rounded-lg focus:outline-none"
                    placeholder="Nombre o Ingrediente: ej.Vodka, Tequila, etc"
                    v-model="store.busqueda.nombre"
                >
            </div>
            <div class="space-y-4">  <!--Agrega separación a los elementos hijos-->
                <label 
                class="block text-white uppercase font-extrabold text-lg"
                for="Categoria">Categoría</label>
                <select 
                    id="categoria"
                    class="p-3 w-full rounded-lg focus:outline-none"
                    v-model="store.busqueda.categoria"
                >
                    <option value="">--Seleccione--</option>
                    <option
                        v-for="categoria in store.categorias" 
                        :key="categoria.strCategory"
                        :value="categoria.strCategory"
                    >
                        {{ categoria.strCategory }}
                    </option>
                </select>
            </div>
            <input 
            type="submit" 
            class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2
            rounded-lg uppercase"
            value="Buscar Recetas">
        </form>
        </div>
        
   </header>
</template>

<style>
    .header {
        background-image: url('/img/bg.jpg');
        background-size: cover;
        background-position: center;
    }
</style>