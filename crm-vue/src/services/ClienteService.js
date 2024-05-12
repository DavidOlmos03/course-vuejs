import api from "../lib/axios"


export default {
    obtenerClientes(){
        return api.get('/clientes')
    },
    agregarCliente(data){
        return api.post('/clientes',data)
    },
    obtenerCliente(id){
        return api.get('/clientes/' + id)
    },
    actualizarCliente(id,data){
        // La diferencia entre patch y put radica en que put elimina (y por lo tanto no regresa a la DDB los datos que no se le estan enviendo)
        // Mientras que patch si los envia, como es en el caso de "estado" en este proyecto
        return api.patch('/clientes/' + id, data)   
    },
    cambiarEstado(id, estado){
        return api.patch('/clientes/' + id, estado)
    },
    deleteCliente(id){
        return api.delete('/clientes/' + id)
    }
}