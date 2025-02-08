/*
Date
animal 
keeper 
status
reason
*/
import mongoose, { Schema, model } from "mongoose"

const appointmentSchema = Schema(
    {
        date:{
            type: Date,
            required: [true, 'Date is required']
        },
        status: {
            type: String,
            enum: ["Finished", "Reserved", "Canceled"],
            required: [true, 'Status is required']
        },        
        reason:{
            type: String,
            required: [true, 'Reason is required']
        },
        animal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Animal'
        },
        keeper: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)
export default model('Appoinment', appointmentSchema)