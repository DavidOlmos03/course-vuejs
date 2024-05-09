
<script setup>
    import { ref } from 'vue';
    import RouterLink from '../components/UI/RouterLink.vue'
    import Heading from '../components/UI/Heading.vue'
    const inicio = ref('inicio')
</script>

<template>
    <div>
        <div class="flex justify-end">
            <RouterLink 
            :to=inicio>
                Volver
            </RouterLink>
        </div>
        
        <Heading>
            Agregar Cliente
        </Heading>
    </div>
</template>
