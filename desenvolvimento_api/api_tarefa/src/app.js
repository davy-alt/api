import express from "express";
import cors from "cors";

import { conn } from "./sequelize.js";

//Tabelas
import tabelaTarefa from "./tarefaTabela.js";
import tabelaSetor from "./tabelaSetor.js"

const PORT = 3333;

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

//estabelecer conexão e criar as tabelas
conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server http is running on PORT:${PORT}`);
    });
  })
  .catch((error) => console.log(error));


  const logRoutes = (request, response, next) => {
    const {url, method} = request
    const rota = `[${method.toUpperCase()}] - ${url}`
    console.log(rota)
    next()
  }


//Middleware GLOBAL
app.use(logRoutes)

  //middleware LOCAL -> NA ROTA

  //Tarefas 
app.get("/tarefas", logRoutes, async (request, response) => {
  try {
    const tarefas = await tabelaTarefa.findAll();
    response.status(200).json(tarefas);
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao listar tarefas",
    });
  }
});

app.post("/tarefas", async (request, response) => {
  const { tarefa, descricao } = request.body;

  if (!tarefa || tarefa.length < 2) {
    response.status(400).json({
      erro: "Campo tarefa inválido",
      mensagen: "O campo tarefa deve ter 2 ou mais caracteres",
    });
    return;
  }
  if (!descricao) {
    response.status(400).json({
      erro: "Campo descricao inválido",
      mensagen: "O descricao não pode ser nulo",
    });
    return;
  }

  const novaTarefa = {
    tarefa,
    descricao,
  };

  try {
    const tarefaCadastrada = await tabelaTarefa.create(novaTarefa);
    response.status(201).json({
      mensagem: "Tarefa cadastrada com sucesso",
      tarefaCadastrada,
    });
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao cadastrar tarefa",
    });
  }
});

app.get("/tarefas/:id", async (request, response) => {
  //listar um tarefa .findOne .findByPk
  const { id } = request.params;

  if (!id) {
    response.status(400).json({
      erro: "Parâmetro id Inválido",
    });
    return;
  }

  try {
    const tarefaSelecionada = await tabelaTarefa.findByPk(id);
    if (!tarefaSelecionada) {
      response.status(404).json({
        erro: "Tarefa não encontrada",
        mensagem: `ID ${id} não existe`,
      });
      return;
    }
    response.status(200).json(tarefaSelecionada);
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao listar uma tarefa",
    });
  }
});

app.put("/tarefas/:id", async (request, response) => {
  const { id } = request.params;
  const { tarefa, descricao, situacao } = request.body;

  if (!id) {
    response.status(400).json({
      erro: "Parâmetro id Inválido",
    });
    return;
  }
  try {
    const tarefaSelecionada = await tabelaTarefa.findByPk(id);
    if (!tarefaSelecionada) {
      response.status(404).json({
        erro: "Tarefa não encontrada",
        mensagem: `ID ${id} não existe`,
      });
      return;
    }

    //Salvar somente as informações que o usuário mandar
    if (tarefa !== undefined) {
      tarefaSelecionada.tarefa = tarefa;
    }
    if (descricao !== undefined) {
      tarefaSelecionada.descricao = descricao;
    }
    if (situacao !== undefined) {
      tarefaSelecionada.situacao = situacao;
    }
    await tarefaSelecionada.save();
    response.status(200).json({
      mensagem: "Tarefa selecionada",
      tarefa: tarefaSelecionada,
    });
  } catch (error) {}
});

app.delete("/tarefas/:id", async (request, response) => {
  const { id } = request.params;
  if(!id){
    response.status(400).json({mensagem: "ID Parâmetro inválido"})
    return
  }

  try {
    const tarefaSelecionada = await tabelaTarefa.findByPk(id) //{id, tarefa, descricao, sit, dtC, dtU} || null
    if(!tarefaSelecionada){
      response.status(404).json({
        erro: "Tarefa não encontrada",
        mensagem: `ID ${id} não existe no banco`
      })
      return
    }

    await tabelaTarefa.destroy({
      where: {id: tarefaSelecionada.id}
    })
    response.status(204).send()
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao deletar uma tarefa",
    });
  }

});

//listar todas as tarefas pendentes/ concluidas
app.get("/tarefas/:situacao", async (request, response) => {
  const { situacao } = request.params

   if (situacao !== "pendente" && situacao !== "concluida") {
    return response.status(400).json({
      erro: "Situação inválida",
      mensagem: "Erro ao listar atividade",
    });
  }

  try {
    const tarefaFiltrada = await tabelaTarefa.findAll({
      where: {pendente}
    })
    response.status(200).json({tarefaFiltrada})
  } catch (error) {
     response.status(500).json({
      erro: "Erro interno ao filtrar tarefas por situação",
    });
  }

})

//listar tarefas vinculada a setor

//Setores

app.get("/setores", async (request, response) => {
  try {
    const setores = await tabelaSetor.findAll()
    response.status(200).json(setores)
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao listar tarefas",
    })
  }
})

app.post("/setores", async (request, response) => {
    const {nome} = request.body

    if(!nome){
      response.status(400).json*{
        erro:"Campo de setor inválido",
        mensagem:"O campo setor não pode ser vazio."
      }
    }

    const novoSetor = {
      nome
    }

    try {
      const setorCadastrado = await tabelaSetor.create(novoSetor)
      response.status(201).json({
        mensagem:"Setor cadastrada com sucesso",
        setorCadastrado
      })
    } catch (error) {
      response.status(500).json({
        erro: "Erro interno ao cadastrar tarefa"
      })
    }
})

app.get("/setores/:id", async (request, response) => {
  const { id } = request.params

  if(!id){
    response.status(400).json({
      erro: "Id invalido",
    });
    return;
  }
  try {
    const SetorSelecionado = await SetorSelecionado.findByPk(id);
    console.log(SetorSelecionado)
    if(!SetorSelecionado) {
      response.status(404).json({
        erro: "setor não encontrado",
        mensagem: "Setor com id ${id} não existe"
      })
      return;
    }
    response.status(200).json(SetorSelecionado)
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao listar um setor"
    })
  }
})

app.put("/setores/:id", async (request, response) => {
  const { nome } = request.body;

  if(!id){
    response.status(400).json({
      erro: "Id invalido",
    });
    return;
  }

  try {
    const SetorSelecionado = await SetorSelecionado.findByPk(id);
    if(!SetorSelecionado){
      response.status(404).json({
        erro: "Setor não encontrado",
        mensagem: "Setor com id ${id} não existe"
      })
      return;
    }

    if(nome !== undefined){
      SetorSelecionado.setor = setor;
    }

    await SetorSelecionado.save();
    response.status(200).json({
      mensagem:"Setor selecionado",
      setor: SetorSelecionado
    })
  } catch (error) {
    response.status(500).json({
      erro:"Erro interno ao atualizar um setor"
    })
  }
})

app.delete("/setores/:id", async (request, response) => {
  const  { id } = request.params;

  if(!id) {
    response.status(400).json({mensagem: "ID Parâmetro inválido"})
    return;
  }

    try {
    const SetorSelecionado = await tabelaSetor.findByPk(id) 
    if(!SetorSelecionado){
      response.status(404).json({
        erro: "Setor não encontrada",
        mensagem: `Setor com ID ${id} não existe no banco`
      })
      return;
    }

    await tabelaSetor.destroy({
      where: {id: SetorSelecionado.id}
    })
    response.status(204).send()
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao deletar uma tarefa",
    });
  }
})

app.get("/setor/:id/tarefas", async (request, response) => {

})

//middlewares
app.use((request, response) => {
  response.status(404).json({
    erro: "Erro de Rota",
    mensagem: "Rota não encontrada",
  });
});
