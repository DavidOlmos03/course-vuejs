<script setup>  //El setup es para utilizar composition API
  //Logica que se va a utilizar
import {ref,reactive,onMounted,watch} from 'vue'
import {db} from './data/guitarras'
import Guitarra from './components/Guitarra.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

  const carrito = ref([])
  const guitarras = ref([])
  const guitarra = ref([])
  /*const state = reactive({
    guitarras: []
  })*/
watch(carrito,()=>{
  guardarLocalStorage()
},{
  deep:true  //entra a todos los elementos del carrito y revisa cuando estos cambien ?????????????????????????????? revisar
})

  onMounted(()=>{    //metodo de ciclo de vida onMounted
    guitarras.value = db
    //state.guitarras = db
    guitarra.value = db[3]
    const carritoStorage = localStorage.getItem('carrito')
    if(carritoStorage){
      carrito.value = JSON.parse(carritoStorage)    //parse para pasar de JSON a arreglo
    }
  })

  const guardarLocalStorage = () =>{
    localStorage.setItem('carrito',JSON.stringify(carrito.value)) //stringfy para pasar de arreglo a JSON
  }

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

  const eliminarProducto = (id)=>{
    carrito.value = carrito.value.filter(producto => producto.id !== id)
  }

  const vaciarCarrito = ()=>{
    carrito.value = []
  }
</script>

<template>
  <!--HTML-->
    <Header 
      v-bind:carrito = "carrito"
      :guitarra = "guitarra"
      @decrementar-cantidad = "decrementarCarrito"
      @incrementar-cantidad="incrementarCarrito"
      @agregar-carrito = "agregarCarrito"
      @eliminar-producto = "eliminarProducto"
      @vaciar-carrito = "vaciarCarrito"
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
