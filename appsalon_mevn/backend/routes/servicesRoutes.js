import express from 'express'
import { getServices, createService,getServiceById, updateService, deleteService } from '../controllers/servicesController.js'

const router = express.Router()


// req lo que envio desde mi frontend y res para lo que recibo del backend como el resultado de una consulta
// router.post('/', createService)
// router.get('/',getServices)

router.route('/')
    .post(createService)
    .get(getServices)

// router.get('/:id',getServiceById)
// router.put('/:id',updateService)
// router.delete('/:id',deleteService)
router.route('/:id')
    .get(getServiceById)
    .put(updateService)
    .delete(deleteService)

export default router

