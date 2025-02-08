import { Router } from 'express'
import { 
    getAllAnimals,
    saveAnimals,
    getAnimalById,
    deleteAnimal,
    updatedAnimal
} from './animal.controller.js'

const api = Router()


api.get('/', getAllAnimals)
api.post('/', saveAnimals)
api.get('/:id', getAnimalById)
api.delete('/:id', deleteAnimal)
api.put('/:id', updatedAnimal)


export default api