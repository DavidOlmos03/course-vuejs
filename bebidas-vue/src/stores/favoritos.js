import { ref, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import { useBebidaStore } from "./bebidas";



export const useFavoritoStore = defineStore('favoritos', ()=>{

    const bebidas = useBebidaStore()
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
        }else{
            agregarFavorito()
        }
       
        // console.log(favoritos)
    }

    return {
        handleClickFavorito,
        favoritos,
        existeFavorito
    }
})