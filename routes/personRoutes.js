const router = require('express').Router()

const res = require('express/lib/response')
const Person = require('../models/Person')


//Create - Criaçao de dados
router.post('/', async (req, res) => {

    //req.body
    const { name, email, rua, cidade, estado, password } = req.body

    if (!name) {
        res.status(404).json({ messege: 'O nome é obrigatorio' })
        return
    }

    const foundPerson = await Person.findOne({ "name": name });

    if(foundPerson){
        res.status(404).json({ messege: 'Pessoa já existe!' })
        return
    }

    const person = {
        name,
        email,
        rua,
        cidade,
        estado,
        password
    }

    //create
    try {
        //criando dados
        await Person.create(person)

        res.status(201).json({ messege: 'Pessoa inserida no sistema com sucesso' })

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Read - Leitura de dados
router.get('/', async (req, res) => {
    try {

        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {

    //extrair o dado da requisiçao, pela url = req.params

    const id = req.params.id

    try {

        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(404).json({ messege: 'O usuario nao foi encontrado!' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Update - atualizçao de dados (PUT,PATCH)

router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { name, email, rua, cidade, estado, password } = req.body

    const person = {
        name,
        email,
        rua,
        cidade,
        estado,
        password
    }

    try {

        const updatePerson = await Person.updateOne({ _id: id }, person)

        if (updatePerson.matchedCount === 0) {
            res.status(404).json({ messege: 'O usuario nao foi encontrado!' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Delete - deletar dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(404).json({ messege: 'O usuario nao foi encontrado!' })
        return
    }

    try {

        await Person.deleteOne({ _id: id })

        res.status(200).json({ messege: 'Usuario removido com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }

})



module.exports = router