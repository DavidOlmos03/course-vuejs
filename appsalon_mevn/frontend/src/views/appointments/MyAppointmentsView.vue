<script setup>
    import { useUserStore } from '@/stores/user';

    const user = useUserStore()
</script>
<template>
    <div>
        <h2 class="text-4xl font-extrabold text-white">Mis Citas</h2>
        <p class="text-white text-lg mt-5">A continuación podras administrar tus citas</p>
    </div>
</template>


