<script setup>
  import {ref, reactive,watch} from 'vue' 
  
  // import Filtro from './components/Filtro.vue'
  import {generarId} from './helpers'

  import Gasto from './components/Gasto.vue'
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
  const gasto = reactive(
    {
      nombre:'',
      cantidad:'',
      categoria:'',
      id:null,
      fecha:Date.now()

    }
  )
  const gastos = ref([])
  watch(gastos,()=>{
    const totalGastado = gastos.value.reduce((total,gasto)=>gasto.cantidad+total,0)
    gastado.value = totalGastado 
    disponible.value = presupuesto.value - totalGastado
  },{
    deep: true
  })
  // const totalGastadoValue = ref('')
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

  const guardarGasto = ()=>{
    gastos.value.push({
      ...gasto,
      id:generarId(),
      
    })
    // for(gasto in gastos){
    //   totalGastadoValue = totalGastadoValue + gasto.cantidad
    // }
    // console.log(totalGastadoValue)
    cerrarModal()

    //Reiniciar objeto
    Object.assign(gasto,
      {
        nombre:'',
        cantidad:'',
        categoria:'',
        id:null,
        fecha:Date.now()
      }
    )

  }
  
  // const totalGastado = ()=>{
  //   for(gasto in gastos){
  //     totalGastadoValue = totalGastadoValue + gasto.value.cantidad
  //   }
  //   console.log(totalGastado)
  // }

</script>

<template>
    <div 
      :class="{fijar:modal.mostrar}" 
    ><!--Esta es una sintaxis particular de vuejs, con un ternario seria :class="[modal.mostrar ? 'fijar':'']"-->
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
            :gastado = "gastado"
            
          />
          <!-- <p v-else>Presupuesto valido</p> -->
        </div>
      </header>

      <main
        v-if="presupuesto > 0"
        
      >
        <div class="listado-gastos contenedor">
          <h2>{{ gastos.length > 0 ? 'Gastos' : 'No hay gastos' }}</h2>
          <Gasto 
            v-for="gasto in gastos" :key="gasto.id"
            :gasto = "gasto"
            
          />
        </div>
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
            @guardar-gasto="guardarGasto"
            :modal = "modal"
            v-model:nombre="gasto.nombre"
            v-model:categoria="gasto.categoria"
            v-model:cantidad="gasto.cantidad"
            :disponible = "disponible"
            
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
  .fijar{
    overflow: hidden;
    height: 100vh;
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

  /**listado-gastos */
  .listado-gastos{
    margin-top: 10rem;
  }
  .listado-gastos h2{
    font-weight: 900;
    color: var(--gris-oscuro);
  }
</style>

