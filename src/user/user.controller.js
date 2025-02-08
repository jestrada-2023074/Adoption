//Gestionar funciones de usuario
 
import User from './user.model.js'
import {checkPassword } from '../../utils/encryp.js'
import {encrypt } from '../../utils/encryp.js'

//Obtener todos
export const getAll = async(req,res)=>{
    try{
        //Configuraciones de paginación
        const { limit = 20, skip = 0 } = req.query
        //Consultar
        const users = await User.find()
            .skip(skip)
            .limit(limit)
           
        if(users.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Users not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Users found:',
                users
            }  
        )
    } catch (err) {
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
 
//Obtener uno
 
export const getUserid = async(req, res)=>{
    try {
        //obtener el id del Producto a mostrar
        let { id } = req.params
        let user = await User.findById(id)
 
        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found: ',
                user
            }
        )
    } catch (err) {
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
 
//Actualizar datos generales
export const update = async(req, res)=>{
    try{
        const { id } = req.params
 
        const data = req.body
 
        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
 
        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated',
                user: update
            }
        )
    }catch(err){
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
 
//Actualizar profilePicture
 
//Actualizar password ****

//Eliminar User 
export const deleteUser = async(req,res)=>{
    try{
        let { id } = req.params

        let user = await User.findByIdAndDelete(id)
        if(!user) return res.status(404).send(
            {
                succes: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                succes: true, 
                message: 'User removed with exit =0: ',
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                succes: false,
                message: 'General error', err
            }
        )
    }
}
export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await checkPassword(user.password, oldPassword)
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Password is incorrect"
            });
        }

        user.password = await encrypt(newPassword)
        await user.save();

        return res.send({
            success: true,
            message: "Password updated successfully =0"
        });

    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).send({
            success: false,
            message: "General error",
            error
        })
    }
}
