import Services from '../models/Services.js'
import { validateObjectId, hundleNotFoundError } from '../utils/index.js'


// req lo que envio desde mi frontend y res para lo que recibo del backend como el resultado de una consulta
// Creación del servicio desde el frontend
const createService = async(req, res)=>{
    
    
    // En caso de no ingresarse todos los campos se envia el codigo 400 al frontend
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg: error.message
        })
    }    

    try {
        const service = new Services(req.body)

        // Almacenar en la base de datos
        await service.save()

        // Enviar respuesta al usuario
        res.json({
            msg: 'El servicio se creo correctamente'
        })   
    } catch (error) {
        console.log(error)
    }
}


const getServices = async (req, res)=>{
    try {
        const services = await Services.find()
        res.json(services)
    } catch (error) {
        console.log(error)
    }
}

const getServiceById = async (req, res)=>{
    const { id } = req.params

    // Validar un object id
    if(validateObjectId(id,res)) return


    // Validar que exista
    const service = await Services.findById(id)
    if (!service) {
        return hundleNotFoundError('El Servicio no existe', res)
    }

    // Mostrar el servicio
    res.json(service)
}


const updateService = async(req, res)=>{
    const { id } = req.params

    // Validar un object id
    if(validateObjectId(id,res)) return


    // Validar que exista
    const service = await Services.findById(id)
    if (!service) {
       return hundleNotFoundError('El Servicio no existe', res)
    }

    // Escribimos en el objeto los valores nuevos
    service.name = req.body.name || service.name
    service.price = req.body.price || service.price

    try {
        await service.save()
        res.json({
            msg: "El servicio se actualizó correctamente"
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteService = async (req,res)=>{
    const { id } = req.params

    // Validar un object id
    if(validateObjectId(id,res)) return


    // Validar que exista
    const service = await Services.findById(id)
    if (!service) {
       return hundleNotFoundError('El Servicio no existe', res)
    }

    try {
        await service.deleteOne()
        res.json({
            msg: "El servicio se eliminó correctamente"
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    createService,
    getServiceById,
    updateService,
    deleteService,
    getServices
}