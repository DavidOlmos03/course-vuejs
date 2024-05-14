import { ref, watch, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useBebidaStore } from "./bebidas";
import { useModalStore } from "./modal";



export const useFavoritoStore = defineStore('favoritos', ()=>{

    const bebidas = useBebidaStore()
    const modal = useModalStore()
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
    }

    function agregarFavorito(){
        favoritos.value.push(bebidas.receta)
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