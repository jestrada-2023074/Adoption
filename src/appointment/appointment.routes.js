import { Router } from 'express'
import { 
    getAllAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
    
} from './appointment.controller.js'
``
const api = Router()


api.get('/', getAllAppointments)
api.post('/', createAppointment)
api.get('/:id', getAppointmentById)
api.delete('/:id', deleteAppointment)
api.put('/:id', updateAppointment)


export default api