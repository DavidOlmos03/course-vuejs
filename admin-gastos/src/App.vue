<script setup>
  import {ref, reactive} from 'vue' 
  import Filtro from './components/Filtro.vue'

  import Modal from './components/Modal.vue'
  import Presupuesto from './components/Presupuesto.vue'
  import ControlPresupuesto from './components/ControlPresupuesto.vue'
  import iconoNuevoGasto from './assets/img/nuevo-gasto.svg'


  const modal = reactive({
    mostrar: false,
    animar: false
  })
  const presupuesto = ref(0)
  const disponible = ref(0)
  const gastado = ref(0)
  
  const definirPresupuesto = (cantidad)=>{
    presupuesto.value = cantidad
    disponible.value = cantidad
  }

  const mostrarModal = ()=>{
    modal.mostrar = true
    setTimeout(()=>{
      modal.animar = true
    },300)
    
  }
  const cerrarModal = ()=>{
    modal.animar = false
    setTimeout(()=>{
      modal.mostrar = false
    },300)
   
  }
</script>

<template>
    <div>
      <header>
        <h1>Planificador de Gastos</h1>

        <div class="contenedor-header contenedor sombra">
          <Presupuesto 
            v-if="presupuesto === 0"
            @definir-presupuesto = "definirPresupuesto"
          />
          <ControlPresupuesto
            v-else
            :presupuesto ="presupuesto"
            v-bind:disponible="disponible"
          />
          <!-- <p v-else>Presupuesto valido</p> -->
        </div>
      </header>

      <main
        v-if="presupuesto > 0"
        
      >
        <div class="crear-gasto">
          <img :src="iconoNuevoGasto" 
          alt="Icono Nuevo Gasto"
          @click="mostrarModal"
          :modal="modal"
          >
        </div>
        <Modal 
          v-if="modal.mostrar === true"
         @cerrar-modal = "cerrarModal" 
         :modal = "modal"
        />
      </main>
    </div>
</template>

<style>
  :root {
    --azul:#3b82f6;
    --blanco: #fff;
    --gris-claro: #F5F5F5;
    --gris:#94a3b8;
    --gris-oscuro: #64748b;
    --negro: #000;
  }
  html {
    font-size: 62.5%;
    box-sizing: border-box ;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body{
    font-size: 1.6rem;
    font-family: "Lato",sans-serif;
    background-color: var(--gris-claro);
  }
  h1{
    font-size: 4rem;
  }
  h2{
    font-size: 3rem;
  }
  header{
    background-color: var(--azul) ;
  }
  header h1{
    padding: 3rem 0;
    margin: 0;
    color: var(--blanco);
    text-align: center;
  }
  .contenedor{
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }
  .contenedor-header{
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }
  .sombra{
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 5rem;
  }

  /*Boton nuevo gasto*/
  .crear-gasto{
    position:fixed;
    bottom: 5rem;
    right: 5rem;
  }
  .crear-gasto img{
    width: 5rem;
  }
  .crear-gasto img:hover{
    border-radius: 3rem;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    cursor: pointer;
  }
</style>

