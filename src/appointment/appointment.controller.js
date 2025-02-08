import Appointment from "./appointment.model.js";

// Obtener todas las citas
export const getAllAppointments = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const appointments = await Appointment.find()
            .populate("animal keeper") // Poblar referencias
            .skip(Number(skip))
            .limit(Number(limit));

        if (appointments.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Appointment not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Appointment found:',
                appointments
            }  
        )
    }  catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

// Obtener una cita por ID
export const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id).populate("animal keeper");
        
        if (appointment.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Appointment not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Appointment found:',
                appointment
            }  
        )
    }  catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

// Crear una nueva cita
export const createAppointment = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const appointment = new Appointment(data)
        await appointment.save()
        return res.send(
            {
                success: true,
                message: 'Appointment created:',
                Appointment
            }  
        )
    }  catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

// Actualizar una cita
export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const updateAppointment = await Appointment.findByIdAndUpdate(
            id, 
            data,
            { new: true }
        )
        
        if (!updateAppointment) return res.status(404).send(
            {
                success: false,
                message: 'Appointment not found and not update'
            }
        )
        return res.send({ 
                success: true, 
                message: "Appointment updated", 
                appointment: updateAppointment 
            })
    }  catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

// Eliminar una cita
export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        
        if (!deletedAppointment) return res.status(404).send({
            sucess: false,
            message: 'Appointment not found'
        })
        return res.send({
            success: true,
            message: 'Appointment removed successfully'
        })
    }  catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}
