<script setup>
    import AdminNav from '@/components/AdminNav.vue'
    import { RouterView } from 'vue-router';
</script>


<template>
    
    <div>
        <AdminNav />
        <div class="pt-32 container mx-auto lg-min-h-screen">
            <RouterView />
        </div>
    </div>
</template>

