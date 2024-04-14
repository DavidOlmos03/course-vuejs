<script setup>
import { reactive } from 'vue';

    const obj = reactive({
        disponible: 'true',
        cantidad: 4
    });

    console.log(obj.cantidad)
</script>
<template>
    <div>
        {{ obj.cantidad }}
    </div>
</template>

<style>

</style>
