<script setup>
  import {ref, reactive,watch, computed,onMounted} from 'vue' 
  
  // import Filtro from './components/Filtro.vue'
  import {generarId} from './helpers'

  
  import Gasto from './components/Gasto.vue'
  import Modal from './components/Modal.vue'
  import Presupuesto from './components/Presupuesto.vue'
  import ControlPresupuesto from './components/ControlPresupuesto.vue'
  import iconoNuevoGasto from './assets/img/nuevo-gasto.svg'
  import Filtros from './components/Filtros.vue'



  
  const modal = reactive({
    mostrar: false,
    animar: false
  })
  const presupuesto = ref(0)
  const disponible = ref(0)
  const gastado = ref(0)
  const filtro = ref('')
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
    localStorage.setItem('gastos',JSON.stringify(gastos.value))
  },{
    deep: true
  })
  watch(modal,() =>{
      if(!modal.mostrar){
       reiniciarStateGasto()
      }
    },{deep:true}
  )
  watch(presupuesto,()=>{
    localStorage.setItem('presupuesto',presupuesto.value)
  })

  onMounted(()=>{
    const presupuestoStorage = localStorage.getItem('presupuesto')
    if (presupuestoStorage) {
      presupuesto.value = Number(presupuestoStorage)
      disponible.value = Number(presupuestoStorage)
    }
    const gastosStorage = localStorage.getItem('gastos')
    if (gastosStorage) {
      gastos.value = JSON.parse(gastosStorage)
    }
  })
  const reiniciarStateGasto = () =>{
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
    if(gasto.id){
      //Estamos editando
      const {id} = gasto   //Para extraer el id de gasto
      const i = gastos.value.findIndex((gasto => gasto.id === id))
      gastos.value[i] = {...gasto}
    }else{
      //Es un registro nuevo
      gastos.value.push({
      ...gasto,
      id:generarId(),
    })
    }
    cerrarModal()

    //Reiniciar objeto
    reiniciarStateGasto()
  }
  const eliminarGasto = ()=>{

    //TAREA: Agregar sweet alert para controlar si se elimina o no el gasto
    gastos.value = gastos.value.filter(gastoState => gastoState.id !== gasto.id)
    cerrarModal()
  }
  
  const seleccionarGasto = id =>{
    const gastoEditar = gastos.value.filter(gasto => gasto.id === id)[0]
    Object.assign(gasto,gastoEditar)
    mostrarModal()
  }

  const gastosFiltrados = computed(()=>{
    if(filtro.value){
      return gastos.value.filter(gasto => gasto.categoria === filtro.value)
    }else{
      return gastos.value
    }
  })
  const resetApp = ()=>{
    //Agregar el sweet alert 2
    gastos.value = []
    presupuesto.value = 0
  }
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
            @reset-app = "resetApp"
          />
          <!-- <p v-else>Presupuesto valido</p> -->
        </div>
      </header>

      <main
        v-if="presupuesto > 0"
      >
        <Filtros
          v-model:filtro="filtro"
        />
        <div class="listado-gastos contenedor">
          <h2>{{ gastosFiltrados.length > 0 ? 'Gastos' : 'No hay gastos' }}</h2>
          <Gasto 
            v-for="gasto in gastosFiltrados" :key="gasto.id"
            :gasto = "gasto"
            @seleccionar-gasto = "seleccionarGasto"
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
            @eliminar-gasto = "eliminarGasto"
            :modal = "modal"
            :disponible = "disponible"
            :id="gasto.id"
            v-model:nombre="gasto.nombre"
            v-model:categoria="gasto.categoria"
            v-model:cantidad="gasto.cantidad"
            
            
        />
      </main>
    </div>
</template>

<style>
  :root {
    --azul:#3b82f6;
    --blanco: #fff;
    --gris-claro: #f5f5f5b1;
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

