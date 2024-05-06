<script setup>
    // import imagen from '../assets/img/grafico.jpg'
    import { computed } from 'vue';
    import CircleProgress from 'vue3-circle-progress'
    import "vue3-circle-progress/dist/circle-progress.css"
    import { formatearCantidad }  from '../helpers'

    defineEmits(['reset-app'])
    const props = defineProps({
        presupuesto:{
            type: Number,
            requere: true
        },
        disponible:{
            type:Number,
            require:true
        },
        gastado:{
            type:Number,
            require:true
        }
    }
    )
    const porcentaje = computed(()=>{
        return parseInt(((props.presupuesto - props.disponible)/props.presupuesto)*100)
    })
</script>


<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">
            <p class="porcentaje">{{ porcentaje }}%</p>
            <!-- <img :src="imagen" alt=""> -->
            <CircleProgress 
            :percent="porcentaje"
            :size="250"
            :border-width="30"
            :border-bg-width="30"
            fill-color="#3b82f6"
            empty-color="#e1e1e1"
            />
        </div>
        <div class="contenedor-presupuesto">
            <button class="reset-app"
            @click="$emit('reset-app')"
            >Resetear App</button>
            <p>
                <span>Presupuesto:</span> {{formatearCantidad(presupuesto) }}
            </p>

            <p>
                <span>Disponible:</span> {{ formatearCantidad(disponible)}}
            </p>

            <p>
                <span>Gastado:</span>  {{ formatearCantidad(gastado) }}
            </p>
        </div>
    </div>
</template>



<style scoped>
    .contenedor-grafico{
        position: relative;
    }
    .porcentaje{
        position: absolute;
        margin: auto;
        top: calc(50% - 1.5rem);
        left: 0;
        right: 0;
        text-align: center;
        z-index: 100;
        font-size: 3rem;
        font-weight: 900;
        color: var(--gris-oscuro);
    }
    .dos-columnas{
        display: flex;
        flex-direction: column;
    }
    .dos-columnas > :first-child{
        margin-bottom: 3rem;
    }
    .reset-app{
        background-color: #DB2777;
        border:none;
        padding: 1rem;
        width: 100%;
        border-radius: 1rem;
        color:var(--blanco);
        font-weight: 900;
        text-transform: uppercase;
        transition-property: background-color;
        transition-duration: 300ms;
        /* cursor: pointer; */
    }
    .reset-app:hover{
        cursor: pointer;
        background-color: #bb0456;
    }
    .contenedor-presupuesto{
        width: 100%;
    }
    .contenedor-presupuesto p{
        font-size: 2.4rem;
        text-align: center;
        color: var(--gris-oscuro);
    }
    @media (min-width: 768px){
        .contenedor-presupuesto p{
        text-align: left;
    }
    }
    .contenedor-presupuesto span{
        font-weight: 900;
        color:var(--azul);
    }
    @media (min-width: 768px){
        .dos-columnas{
            flex-direction: row;
            gap: 4rem;
            align-items: center;
        }
        .dos-columnas > :first-child{
        margin-bottom: 0;
    }
    }
</style>