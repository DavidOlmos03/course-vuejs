import express from 'express'
import { createAppointment, getAppointmetsByDate } from '../controllers/appointmentController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(authMiddleware,createAppointment)
    .get(authMiddleware,getAppointmetsByDate)

export default router