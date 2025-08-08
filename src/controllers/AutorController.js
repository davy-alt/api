import autorModel from "../models/autorModel.js";

export const listarAutores = async (req, res) => {
try {
    const autores = await autorModel.findAll()
    res.status(200).json(autores)
} catch (error) {
    res.status(500).json({
        erro: "Erro interno ao buscar autores"
    })
}}

export const CadastrarAutor = async (req, res) => {
        const {nome, data_nascimento, biografia, nacionalidade} = req.body

        
    if(!nome){
        res.status(400).json({
            erro: "Campo nome inválido",
            mensagem: "O campo nome não pode ser nulo"
        })
        return
    }
    if(!data_nascimento){
        res.status(400).json({
            erro: "Campo data_nascimento inválido",
            mensagem: "O campo data_nascimento não pode ser nulo"
        })
        return
    }
    if(!biografia){
        res.status(400).json({
            erro: "Campo biografia inválido",
            mensagem: "O campo biografia não pode ser nulo"
        })
        return
    }
    if(!nacionalidade){
        res.status(400).json({
            erro: "Campo nacionalidade inválido",
            mensagem: "O campo nacionalidade não pode ser nulo"
        })
        return
    }

    try {
        const novoAutor = await autorModel.create(novoAutor)
        res.status(201).json({
            mensagem: "Autor cadastrado com sucesso",
            novoAutor
        })
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao cadastrar um aluno"
        })
    }
  
    
}

export const buscarAutor = async (req, res) => {
      const { id } = req.params

    if(!id){
        res.status(400).json({
            erro: "Parâmetro id inválido",
            mensagem: "Parâmetro id necessário para buscar um aluno"
        })
        return
    }

    try {
        const autorSelecionado = await autorModel.findByPk(id)
        if(!autorSelecionado){
            res.status(404).json({
                erro: "Id invalido",
                mensagem:"Nenhum autor com esse id foi encontrado"
            })
            return
        }
        res.status(200).json(autorSelecionado)
    } catch (error) {
         res.status(500).json({
            erro: "Erro interno ao listar um autor"
        })
    }
}

export const atualizarAutor = async (req, res) => {
    
}