import { ref,onMounted } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useBebidaStore = defineStore('bebidas', ()=>{

    const categorias = ref([])

    onMounted(async ()=>{
        const {data :{drinks}} =  await axios('http://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')

        categorias.value = drinks
    })
    
    return {
        categorias
    }
})