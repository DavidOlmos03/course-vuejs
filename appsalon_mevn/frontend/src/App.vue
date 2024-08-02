<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <div class="md:flex h-screen">
      <!-- Esta es la forma de agregar una imagen con tailwindcss en el archivo taiwind.config.js se creo un backgroundImage llamado app-->
      <div class="h-64 md:h-auto bg-cover bg-center md:w-1/3 bg-app"></div>
      <div class="md:w-2/3 px-10 py-5 min-h-full overflow-y-scroll">
        <RouterView />
      </div>
    </div>
  
 
</template>
