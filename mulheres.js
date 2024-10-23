const express = require("express") // aqui estou iniciando o express
const route = express.Router() // aqui estou configurando a primeira parte da rota
const cors = reqire('cors') // trazendo o cors que permite que o front consuma a api


//Se conectando ao bd
const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()
const Mulher = require('./mulherModel')

const app = express() // aqui estou iniciando o app
app.use(express.json())
app.use(cors())
const porta = 3333 // aqui estou criando a porta


// GET
async function mostraMulheres(request, response) {
    try{
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        response.json(mulheresVindasDoBancoDeDados)
    }catch(error){

    }
}

// POST
async function criaMulher(request, response){
    const novaMulher =  new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(200).json(mulherCriada)
    } catch(error){
        console.log(error)
    }
}

// PATCH
async function corrigeMulher(request, response){
    try{
        const mulherEncontrada = await Mulher.findById(request.params.id)
        if (request.body.nome){
            mulherEncontrada.nome = request.body.nome
        }
        if (request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }
        if (request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem
        }
        if (request.body.citacao){
            mulherEncontrada.citacao = request.body.citacao
        }
        const mulherAtualizadaNoBandoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBandoDeDados)
    }catch(error){
        console.log(error)
    }


}

// DELETE
async function deletaMulher(request, response){
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: 'Mulher deletada com sucesso'})
    }catch(error){
        console.log(error)
    }

}

// PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(route.get('/mulheres', mostraMulheres)) // configurei rota get /mulheres
app.use(route.post('/mulheres', criaMulher)) // configurei rota post /mulheres
app.use(route.patch('/mulheres/:id', corrigeMulher)) // configurei rota PATCH /mulheres
app.use(route.delete('/mulheres/:id', deletaMulher)) // configurei rota delete /mulheres
app.listen(porta, mostraPorta) // Servidor ouvindo a porta