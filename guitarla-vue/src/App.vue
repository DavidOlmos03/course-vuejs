<script setup>  //El setup es para utilizar composition API
  //Logica que se va a utilizar
import {ref,reactive,onMounted} from 'vue'
import {db} from './data/guitarras'
import Guitarra from './components/Guitarra.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

  const carrito = ref([])
  const guitarras = ref([])
  /*const state = reactive({
    guitarras: []
  })*/
  onMounted(()=>{
    guitarras.value = db
    //state.guitarras = db
  })

  const agregarCarrito = (guitarra) =>{
    const exiteCarrito = carrito.value.findIndex(producto => producto.id === guitarra.id);
    if(exiteCarrito >= 0){
      carrito.value[exiteCarrito].cantidad++
    }else{
      guitarra.cantidad = 1;
      carrito.value.push(guitarra);
    }
    
  }

  const decrementarCarrito = (id)=>{
    const index = carrito.value.findIndex(producto => producto.id === id);
    if(carrito.value[index].cantidad<=1) return
      carrito.value[index].cantidad--
  }

  const incrementarCarrito = (id)=>{
    const index = carrito.value.findIndex(producto => producto.id === id);
    if(carrito.value[index].cantidad>=10) return
    carrito.value[index].cantidad++
  }
</script>

<template>
  <!--HTML-->
    <Header 
      v-bind:carrito = "carrito"
      @decrementar-cantidad = "decrementarCarrito"
      @incrementar-cantidad="incrementarCarrito"
    />
    <main class="container-xl mt-5">
        <h2 class="text-center">Nuestra Colección</h2>

        <div class="row mt-5">
            <Guitarra 
            v-for="guitarra in guitarras"
            v-bind:guitarra="guitarra"    
            @agregar-carrito = "agregarCarrito"
            />
            <!--Para pasar del padre al hijo utilizo props ie v-bind: o simple/ :-->
        </div>
    </main>


    <Footer />
</template>

<style>
/**
  CSS/SCSS
  npm install scss
*/
  h1{
    text-transform: uppercase
  }
</style>
