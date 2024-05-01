<script setup>
    import imagen from '../assets/img/grafico.jpg'
    import { formatearCantidad }  from '../helpers'
    const props = defineProps({
        presupuesto:{
            type: Number,
            requere: true
        },
        disponible:{
            type:Number,
            require:true
        }
    }
    )

</script>


<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">
            <img :src="imagen" alt="">
        </div>
        <div class="contenedor-presupuesto">
            <button class="reset-app">Resetear App</button>
            <p>
                <span>Presupuesto:</span> {{formatearCantidad(presupuesto) }}
            </p>

            <p>
                <span>Disponible:</span> {{ formatearCantidad(disponible) }}
            </p>

            <p>
                <span>Gastado:</span> 0
            </p>
        </div>
    </div>
</template>



<style scoped>
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