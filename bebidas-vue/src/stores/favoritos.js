import { ref, watch, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useBebidaStore } from "./bebidas";
import { useModalStore } from "./modal";
import { useNotificacionStore } from "./notificaciones";


export const useFavoritoStore = defineStore('favoritos', ()=>{

    const bebidas = useBebidaStore()
    const modal = useModalStore()
    const notificaciones = useNotificacionStore()
    const favoritos = ref([])



   
    
    onMounted(()=>{
       favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    })

    watch(favoritos,()=>{
        guardarLocalStorage()
    },{
        deep:true
    })

    function existeFavorito(){
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return favoritosLocalStorage.some(favorito => favorito.idDrink === bebidas.receta.idDrink)
    }

    function guardarLocalStorage(){
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }


    function eliminarFavorito(){
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink)

        notificaciones.mostrar = true
        notificaciones.texto = 'Eliminado de favoritos'

        // setTimeout(()=>{
        //     notificaciones.$reset()
        // }, 3000)
    }

    function agregarFavorito(){
        favoritos.value.push(bebidas.receta)

        notificaciones.mostrar = true
        notificaciones.texto = 'Se agregó a favoritos'

        // setTimeout(()=>{
        //     notificaciones.$reset()
        // }, 3000)
    }
    function handleClickFavorito(){

        if (existeFavorito()) {
            eliminarFavorito()
            // e.target.textContent = 'Agregar a favoritos'
        }else{
            agregarFavorito()
            // e.target.textContent = 'Eliminar de favoritos'
        }
        modal.modal = false
        // console.log(favoritos)
    }
    const noFavoritos = computed(()=>favoritos.value.length === 0)
    return {
        handleClickFavorito,
        favoritos,
        existeFavorito,
        noFavoritos
    }
})