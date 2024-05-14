import { ref,computed } from "vue";
import { defineStore } from "pinia";
import { useFavoritoStore } from "./favoritos";
import { useBebidaStore } from "./bebidas";


export const useModalStore = defineStore('modal',()=>{

    const favoritos = useFavoritoStore();
    const bebidas = useBebidaStore();
    const modal = ref(false)

    function handleClickModal(){
        modal.value = !modal.value
    }

    const textoBoton = computed(()=>{
        return favoritos.existeFavorito(bebidas.receta.idDrink) ? 'Eliminar de favoritos' : 'Agregar a favoritos'
    })
    return {
        modal,
        handleClickModal,
        textoBoton
    }
})