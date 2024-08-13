import express from 'express'
import { createAppointment, getAppointmetsByDate, getAppointmetsById, updateAppointment } from '../controllers/appointmentController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(authMiddleware,createAppointment)
    .get(authMiddleware,getAppointmetsByDate)

router.route('/:id')
    .get(authMiddleware, getAppointmetsById)
    .put(authMiddleware, updateAppointment)
    
export default router