import api from "@/lib/axios";

export default{
    obtenerCategorias(){
        return api('/list.php?c=list')
    },
    buscarRecetas({categoria,nombre}){   //Aplicancod destruction a la busqueda que estamos haciendo para obtener solo la categoria y el nombre
        return api(`filter.php?c=${categoria}&i=${nombre}`)
    }
}