<script setup>
    // import { ref } from 'vue';
    import RouterLink from '../components/UI/RouterLink.vue'
    import Heading from '../components/UI/Heading.vue'
    // const agregar = ref('agregar-cliente')
</script>
<template>
    <div>
    <div class="flex justify-end">
        <RouterLink 
        to = 'agregar-cliente'
        >
            Agregar Cliente
        </RouterLink>
    </div>
        <Heading>
            Clientes
        </Heading>
    </div>
</template>


