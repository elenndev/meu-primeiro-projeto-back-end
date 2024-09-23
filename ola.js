const express = require("express")
const route = express.Router()

const app = express()
const porta = 3333

function mostraOla(requeste, response){
    response.send('Olá, mundo!')
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(route.get('/ola', mostraOla))
app.listen(porta, mostraPorta)