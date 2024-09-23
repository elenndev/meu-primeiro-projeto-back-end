const express = require("express") // aqui estou iniciando o express
const route = express.Router() // aqui estou configurando a primeira parte da rota
const { v4: uuidv4 } = require('uuid')

const app = express() // aqui estou iniciando o app
app.use(express.json())
const porta = 3333 // aqui estou criando a porta

// aqui estou criando lista inicial de mulheres
const mulheres = [

    {
        id: '1',
        nome: 'Simara Conceição',

        imagem: 'https://bit.ly/3LJIyOF',

        minibio: 'Desenvolvedora e instrutora',

    },

    {
        id: '2',
        nome: 'Iana Chan',

        imagem: 'https://bit.ly/3JCXBqP',

        minibio: 'CEO & Founder da PrograMaria',

    },

    {
        id: '3',
        nome: 'Luana Pimentel',

        imagem: 'https://bit.ly/3FKpFaz',

        minibio: 'Senior Staff Software Engineer',

    }

]

// GET
function mostraMulheres(request, response) {
    response.json(mulheres)
}

// POST
function criaMulher(request, response){
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }

    mulheres.push(novaMulher)

    response.json(mulheres)
}

// PATCH
function corrigeMulher(request, response){
    function encontraMulher(mulher){
        if (mulher.id == request.params.id){
            return mulher
        }
    }
    const mulherEncontrada = mulheres.find(encontraMulher)

    if (request.body.nome){
        mulherEncontrada.nome = request.body.nome
    }
    if (request.body.minibio){
        mulherEncontrada.minibio = request.body.minibio
    }
    if (request.body.imagem){
        mulherEncontrada.imagem = request.body.imagem
    }

    response.json(mulheres)
}

// PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(route.get('/mulheres', mostraMulheres)) // configurei rota get /mulheres
app.use(route.post('/mulheres', criaMulher)) // configurei rota post /mulheres
app.listen(porta, mostraPorta) // Servidor ouvindo a porta