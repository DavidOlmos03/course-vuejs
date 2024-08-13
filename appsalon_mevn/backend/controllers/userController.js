import Appointment from "../models/Appointments.js"

const getUserAppointments = async (req, res)=>{
    const { user} = req.params
    // Controlando que unicamente el usuario autenticado en cuestión pueda ver sus citas
    // TAREA: clase 485 minuto 7:00 Se debe permitir al usuario con role admin, ver los datos
    // Usuario el cual hace la solicitud en la url
    // console.log(user) 
    // Usuario autenticado
    // console.log(req.user._id) 
    // Consulta si el usuario autenticado es admin, para que así tenga acceso a todas las citas así no sean las de él
    const isAdmin = req.user.admin
    // console.log(req.user.admin)
    if (user !== req.user._id.toString() && isAdmin != true) {
        const error = new Error('Acceso Denegado')
        return res.status(400).json({msg: error.message})
    }
    
    // Obteniendo las citas de un usuario, fultrando por usuario y fecha (mes actual en adelante) 
    try {
        const appointments = await Appointment.find({    
            user,
            date:{
                $gte : new Date()
            }
        }).populate('services').sort({date:'asc'})
        res.json(appointments)
    } catch (error) {
        console.log(error)
    }
}


export {
    getUserAppointments
}