<script setup>
    import { formatCurrency } from '@/helpers';

    defineProps({
        service:{
            type: Object
        }
    })
</script>

<template>
    <div class="p-5 space-y-5 rounded-lg bg-white">
        <p class="text-2xl font-light">{{ service.name }}</p>
        <p class="text-4xl text-blue-600 font-black">{{ formatCurrency(service.price) }}</p>
    </div>
</template>
