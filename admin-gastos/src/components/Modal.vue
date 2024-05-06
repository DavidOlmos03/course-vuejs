<script setup>
    import {ref, computed} from 'vue'
    import cerrarModal from '../assets/img/cerrar.svg'
    import Alerta from '../components/Alerta.vue'

    const error = ref('')
    const emits = defineEmits(['cerrar-modal','update:nombre','update:cantidad','update:categoria','guardar-gasto','eliminar-gasto'])
    const props = defineProps(
        {
           modal:{
            type: Object,
            required: true
           },
           nombre:{
            type:String,
            required:true
           },
           cantidad:{
            type:[String,Number],
            required:true
           },
           categoria:{
            type:String,
            required:true
           },
           disponible:{
            type:Number,
            required:true
           },
           id:{
            type:[String,null],
            required:true
           }
        }
    )
    const old = props.cantidad
    // console.log(props.id)
    const agregarGasto = ()=>{
        const {cantidad, categoria, nombre, disponible, id} = props
        
        //Validar que no haya campos vacios
        
        if([nombre,cantidad,categoria].includes('')){
            error.value = 'Todos los campos son obligatorios'
            setTimeout(()=>{
                error.value = ''
            },3000)
            return
        }
        //Validar la cantidad
        if (cantidad <= 0 ) {
            error.value = 'Cantidad no válida'
            setTimeout(()=>{
                error.value = ''
            },3000)
            return
        }

        //Validar que el usuario no gaste mas de lo disponible
        if (id) {
            //Tomar en cuenta el gasto ya realizado
            if (cantidad > old + disponible) {
                
                error.value = 'Has excedido el presupuesto'
                setTimeout(()=>{
                    error.value = ''
                },3000)
                return
            }
        } else {
            if(disponible < cantidad){
            error.value = 'Has excedido el presupuesto'
            setTimeout(()=>{
                error.value = ''
            },3000)
            return
            }
        }
        emits('guardar-gasto')

    }

    //Utilizando un computed property para ver si estoy editando y utilizar esto en el legend y el input
    //Del boton para enviar el formulario, esto es para que el código quede mas limpio y "logico"
    const isEditing = computed(()=>{
        return props.id
    })
</script>

<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img 
            @click="$emit('cerrar-modal')"
            :src="cerrarModal" 
            alt="cerrar modal">
            
        </div>
        
        <div 
        :class="[modal.animar ? 'animar' : 'cerrar']"
        class="contenedor contenedor-formulario"
            >
            <form
                class="nuevo-gasto"
                @submit.prevent="agregarGasto"
            >
            <legend>{{isEditing ? 'Guardar Cambios':'Añadir Gasto'}}</legend>
            <Alerta v-if="error">{{ error }}</Alerta>
            <div class="campo">
                <label for="nombre">Nombre Gasto:</label>
                <input 
                    type="text"
                    id="nombre"
                    placeholder="Añade el nombre del gasto"
                    :value="nombre" 
                    @input="emits('update:nombre',$event.target.value)"              
                >
            </div>

            <div class="campo">
                <label for="cantidad">Cantidad:</label>
                <input 
                    type="number"
                    id="cantidad"
                    placeholder="Añade la cantidad del gasto"
                    :value="cantidad"
                    @input="emits('update:cantidad',+$event.target.value)"
                >
            </div>

            <div class="campo">
                <label for="categoria">Categoría:</label>
                <select
                    id="categoria"
                    :value="categoria"
                    @input="emits('update:categoria',$event.target.value)"
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <input 
                type="submit" 
                :value="[isEditing ? 'Guardar Cambios':'Añadir Gasto']"              
            >
        </form>
            <button
                type="button"
                class="btn-eliminar"
                v-if="isEditing"
                @click="$emit('eliminar-gasto')"
            >
                Eliminar Gasto
            </button>
        </div>   
    </div>
</template>
<style  scoped>
    .modal{
        position: absolute;
        background-color: rgba(0, 0, 0, 0.9);  /**0.7 es el 70% de opacidad */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .cerrar-modal{
        position: fixed;
        top: 3rem;
        right: 3rem;
    }
    .cerrar-modal img{
        width: 3rem;
    }
    .cerrar-modal img:hover{
        box-shadow: 0px 10px 15px -3px rgb(255, 255, 255);
        cursor: pointer;
    }
    /* 
        Formulario 
    */
    .contenedor-formulario{
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in;
        opacity: 0;
    }
    .contenedor-formulario.animar{
        opacity: 1;
    }
    .contenedor-formulario.cerrar{
        opacity: 0;
    }
    .nuevo-gasto{
        margin: 10rem auto 0 auto;
        display: grid;
        gap: 2rem;
    }
    .nuevo-gasto legend{
        text-align: center;
        color: var(--blanco);
        font-size: 3rem;
        font-weight: 700;
    }
    .campo{
        display: grid;
        gap:2rem;
    }
    .nuevo-gasto input,
    .nuevo-gasto select{
        background-color: var(--gris-claro);
        border-radius: 1rem;
        padding: 1rem;
        border: none;
        font-size: 2.2rem;
    }
    .nuevo-gasto label{
        color: var(--blanco);
        font-size: 3rem;
    }
    .nuevo-gasto input[type="submit"]{
        background-color: var(--azul);
        color: var(--blanco);
        font-weight: 700;
        cursor: pointer;
    }
    /* Boton de Eliminar Gasto */
    .btn-eliminar{
        border:none;
        padding: 1rem;
        width: 100%;
        margin: 10rem 0 0 0;
        background-color: #ef4444;
        font-weight: 700;
        font-size: 1.2rem;
        color: var(--blanco);
        cursor:pointer;
    }
</style>