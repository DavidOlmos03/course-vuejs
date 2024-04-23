<script setup>
  import {ref, reactive,watch,onMounted} from 'vue'
  import {uid} from 'uid'
  import Header from './components/Header.vue'
  import Formulario from './components/Formulario.vue'
  import Paciente from './components/Paciente.vue'

  //array
  const pacientes = ref([])

  watch(pacientes,()=>{
    guardarLocalStorage()
  },{
    deep:true
  })

  onMounted(()=>{    //metodo de ciclo de vida onMounted
    const pacientesStorage = localStorage.getItem('pacientes')
    if(pacientesStorage){
      pacientes.value = JSON.parse(pacientesStorage)    //parse para pasar de JSON a arreglo
    }
  })

  const guardarLocalStorage = ()=>{
    localStorage.setItem('pacientes',JSON.stringify(pacientes.value))
  }
  //object
  const paciente = reactive({
        id: null,
        nombre: '',
        propietario: '',
        email: '',
        alta: '',
        sintomas: ''
    })

  
  const guardarPaciente = () =>{
    if(paciente.id){ //En caso de que el id sea diferente de null, es porque el paciente ya esta creado y lo que se va a hacer es EDITARLO
      const {id} = paciente
      const i = pacientes.value.findIndex((pacienteState) => pacienteState.id === id )
      pacientes.value[i] = {...paciente}

    }else{   //En caso de el id ser null es porque no se ha creado el usuario, entonces se esta REGISTRANDO
      pacientes.value.push({
      ...paciente,
      id: uid()
      }) 
    }
    //Reiniciar paciente
    // paciente.nombre= '',
    // paciente.propietario= '',
    // paciente.email= '',
    // paciente.alta= '',
    // paciente.sintomas= ''

    //Otra forma
    Object.assign(paciente,{
      nombre: '',
      propietario: '',
      email: '',
      alta: '',
      sintomas: '',
      id: null
    })
  }

  const actualizarPaciente = (id)=>{
    const pacienteEditar = pacientes.value.filter(paciente => paciente.id === id)[0]
    Object.assign(paciente,pacienteEditar)
  }

  const eliminarPaciente = (id) =>{
    pacientes.value = pacientes.value.filter(pacienteState => pacienteState.id !== id)
  }
</script>

<template>
  <div class="container mx-auto mt-20">
    <Header />
    <div class="mt-12 md:flex">
      <Formulario 
        v-model:nombre="paciente.nombre"
        v-model:propietario="paciente.propietario"
        v-model:email="paciente.email"
        v-model:alta="paciente.alta"
        v-model:sintomas="paciente.sintomas"
        @guardar-paciente = "guardarPaciente"
        :id = "paciente.id"
      />
      <div class="md:w-1/2 md:h-screen overflow-y-scroll">
        <h3 class="font-black text-3xl text-center">Administra tus pacientes</h3>
        
        <div v-if="pacientes.length > 0">
          <p class="text-lg mt-5 text-center mb-10">
            Información de
            <span class="text-indigo-600 font-bold">Pacientes</span>  
          </p>
          <Paciente 
          v-for="paciente in pacientes"
          :paciente="paciente"
          @actualizar-paciente = "actualizarPaciente"
          @eliminar-paciente = "eliminarPaciente"
          />
        </div>
        <p v-else class="mt-20 text-2xl text-center">No hay pacientes</p>
      </div>
    </div>
  </div>
</template> 

