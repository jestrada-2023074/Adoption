//Modelo de animales
 
import mongoose, { Schema, model } from "mongoose"
 
const animalSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characteres`]
        },
        race: {
            type: String,
            required: [true, 'Race is required'],
            maxLength: [25, `Can't be overcome 25 characteres`]
        },
        age: {
            type: String,
            required: [true, 'Age is required'],
            maxLength: [25, `Can't be overcome 25 characteres`]
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            maxLength: [25, `Can't be overcome 25 characteres`]
        },
        keeper: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)
export default model('Animal', animalSchema)
