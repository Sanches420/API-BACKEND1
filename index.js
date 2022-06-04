//config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//forma de ler jSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Rota da API
const personRoutes =  require('./routes/personRoutes')

app.use('/person', personRoutes)

//endpiont inicial
app.get('/', (req, res) => (


    res.json({ messege: 'Oi Mariana' })
))

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@backendcluster.iquug.mongodb.net/bancodaapi?retryWrites=true&w=majority`
)
    .then(() => {
        console.log("conectamos ao mongdb")
        app.listen(3000)
    })
    .catch((err) => console.log(err))
