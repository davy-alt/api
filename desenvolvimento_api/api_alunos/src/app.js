import express from "express";
import conn from "./conn.js";
import tabelaResponsavel from "./responsaveis.js";
import tabelaAluno from "./alunos.js";



const PORT = 3333

const app = express()

conn.sync()

app.get("/responsaveis", async (req, res) => {
  try {
    const responsaveis = await tabelaResponsavel.findAll();
    res.status(200).json(responsaveis);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar responsáveis" });
  }
});


app.post("/responsaveis", async (req, res) => {
  const { nome, idade, email, senha, telefone, grau_parentesco, endereco, data_nascimento } = req.body;

  if (!nome || !email || !senha || !grau_parentesco || !data_nascimento || idade < 18) {
    return res.status(400).json({ erro: "Dados obrigatórios ausentes ou inválidos" });
  }

  const novoResponsavel = {nome, idade, email, senha, telefone, grau_parentesco, endereco, data_nascimento}

  try {
    const novoResponsavel = await tabelaResponsavel.create({ novoResponsavel })
    res.status(201).json({ mensagem: "Responsável criado com sucesso", novoResponsavel });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar responsável" });
  }
});


app.get("/responsaveis/:id", async (req, res) => {
  const { id } = req.params;
  const responsavel = await tabelaResponsavel.findByPk(id);
  if (!responsavel) {
    return res.status(404).json({ erro: "Responsável não encontrado" });
  }
  res.status(200).json(responsavel);
});


app.put("/responsaveis/:id", async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  try {
    const responsavel = await tabelaResponsavel.findByPk(id);
    if (!responsavel) {
      return res.status(404).json({ erro: "Responsável não encontrado" });
    }

    await responsavel.update(dados);
    res.status(200).json({ mensagem: "Responsável atualizado com sucesso", responsavel });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar responsável" });
  }
});


app.delete("/responsaveis/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const responsavel = await tabelaResponsavel.findByPk(id);
    if (!responsavel) {
      return res.status(404).json({ erro: "Responsável não encontrado" });
    }

    await responsavel.destroy({
        where: {id: responsavel.id}
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover responsável" });
  }
});

app.get("/alunos", async (req, res) => {
    try {
        const alunos = await alunoTabela.findAll()

        res.status(200).json(alunos)
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao listar os alunos"
        })
    }
})

app.post("/alunos", async (req, res) => {
    const {ra, nome, email, responsavel_id} = req.body

    if(!ra){
        res.status(400).json({
            erro: "Campo ra inválido",
            mensagem: "O campo ra não pode ser nulo"
        })
        return
    }
    if(!nome){
        res.status(400).json({
            erro: "Campo nome inválido",
            mensagem: "O campo nome não pode ser nulo"
        })
        return
    }
    if(!email){
        res.status(400).json({
            erro: "Campo email inválido",
            mensagem: "O campo email não pode ser nulo"
        })
        return
    }
    if(!responsavel_id){
        res.status(400).json({
            erro: "Campo responsavel_id inválido",
            mensagem: "O campo responsavel_id não pode ser nulo"
        })
        return
    }

    const novoAluno = {
        ra,
        nome,
        email,
        responsavel_id
    }

    try {
        const alunoNovo = await alunoTabela.create(novoAluno)
        
        res.status(201).json({
            mensagem: "Aluno cadastrado com sucesso",
            alunoNovo
        })

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao cadastrar um aluno"
        })
    }

})

app.get("/alunos/:id", async (req, res) => {
    const { id } = req.params

    if(!id){
        res.status(400).json({
            erro: "Parâmetro id inválido",
            mensagem: "Parâmetro id necessário para buscar um aluno"
        })
        return
    }

    try {
        const alunoSelecionado = await alunoTabela.findByPk(id)
        if(!alunoSelecionado){
            res.status(404).json({
                erro: "Id inválido",
                mensagem: "Nenhum aluno com esse id foi encontrado"
            })
            return
        }

        res.status(200).json(alunoSelecionado)
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao listar um aluno"
        })
    }
})

app.put("/alunos/:id", async (req, res) => {
    const { id } = req.params
    const {ra, nome, email} = req.body

    if(!id){
        res.status(400).json({
            erro: "Parâmetro id inválido",
            mensagem: "Parâmetro id necessário para atualizar um aluno"
        })
        return
    }

    if(!ra){
        res.status(400).json({
            erro: "Campo ra inválido",
            mensagem: "O campo ra não pode ser nulo"
        })
        return
    }
    if(!nome){
        res.status(400).json({
            erro: "Campo nome inválido",
            mensagem: "O campo nome não pode ser nulo"
        })
        return
    }
    if(!email){
        res.status(400).json({
            erro: "Campo email inválido",
            mensagem: "O campo email não pode ser nulo"
        })
        return
    }

    try {
        const alunoSelecionado = await alunoTabela.findByPk(id)

        if(!alunoSelecionado){
            res.status(404).json({
                erro: "Id inválido",
                mensagem: "Nenhum aluno com esse id foi encontrado na base de dados"
            })
            return
        }

        if(ra !== undefined){
           alunoSelecionado.ra = ra 
        }
        if(nome !== undefined){
           alunoSelecionado.nome = nome 
        }
        if(email !== undefined){
           alunoSelecionado.email = email 
        }

        await alunoSelecionado.save()
        res.status(200).json(alunoSelecionado)

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao atualizar um aluno"
        })
    }
})

app.delete("/alunos/:id", async (req, res) => {
    const { id } = req.params

    if(!id){
        res.status(400).json({
            erro: "Parâmetro id inválido",
            mensagem: "Parâmetro id necessário para deletar um aluno"
        })
        return
    }

    try {
        const alunoSelecionado = await alunoTabela.findByPk(id)
        if(!alunoSelecionado){
            res.status(404).json({
                erro: "Id inválido",
                mensagem: "Nenhum aluno com esse id foi encontrado na base de dados"
            })
            return
        }

        await alunoTabela.destroy({
            where: {id: alunoSelecionado.id}
        })

        res.status(200).send()
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao deletar um aluno"
        })
    }
})


app.listen(PORT, () => {
    console.log("Servidor On")
})