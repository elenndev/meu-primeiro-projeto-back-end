// Se der erro tentar trocar ROUTE por ROUTER
const express = require("express")
const route = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response){
    // json para enviar
    // um objeto como resposta
    response.json({
        nome:'Elen Damares',
        imagem: 'url',
        minibio: 'Estudante de engenharia de software'
    })
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(route.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)