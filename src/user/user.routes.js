import { Router } from 'express'
import { 
    getAll,
    getUserid,
    deleteUser,
    update,
    updatePassword
} from './user.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { updateUserValidator } from '../../middlewares/validators.js'

const api = Router()

api.get('/', getAll)
api.get('/:id', getUserid)
api.delete('/:id', deleteUser)
api.put('/password/:id', updatePassword)
api.put('/:id', [validateJwt, updateUserValidator], update)

export default api