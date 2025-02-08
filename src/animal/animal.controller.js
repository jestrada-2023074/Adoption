import Animal from './animal.model.js'
//Agregar Animal
export const saveAnimals = async (req, res) =>{
    try{
        const data = req.body
        console.log(data)
        let animal = new Animal(data)

        await animal.save()
        
        return res.send(
            {
                success: true, 
                message: 'Animal saved succcessfully',
                animal
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
// Obtener todos los animales
export const getAllAnimals = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query;
        const animals = await Animal.find()
            .skip((skip))
            .limit((limit))

        if (animals.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Animals not found'
            }
        )
        }
        return res.send({
            success: true,
            message: 'Animals found:',
            animals
        })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General error', err });
    }
}

// Buscar animal por ID
export const getAnimalById = async (req, res) => {
    try {
        let { id } = req.params
        let animal = await Animal.findById(id);

        if (!animal) return res.status(404).send({
            success: false,
            message: 'Animal not found'
        });

        return res.send({
            success: true,
            message: 'Animal found:',
            animal
        })
    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error', err
        })
    }
}

// Eliminar animal
export const deleteAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let animal = await Animal.findByIdAndDelete(id)

        if (!animal) return res.status(404).send({
            success: false,
            message: 'Animal not found'
        })

        return res.send({
            success: true,
            message: 'Animal removed successfully'
        })
    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error', err
        })
    }
}

// Actualizar animal
export const updatedAnimal = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const updatedAnimal = await Animal.findByIdAndUpdate(
            id, 
            data, 
            { new: true }
        )

        if (!updatedAnimal) return res.status(404).send(
            {
                success: false,
                message: 'Animal not found and not updated'
            }
        )
        return res.send({
            success: true,
            message: 'Animal updated successfully',
            animal: updatedAnimal
        })
    } catch (err) {
        console.error('General error:', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}
