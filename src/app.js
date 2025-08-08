import express from "express"
import cors from "cors"
import { conn } from "./config/sequelize.js"


//Tabelas
import autorModel from "./models/autorModel.js"

//rotas

import autorRoutes from "./routes/autorRoutes.js"

const app = express ()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

conn.sync()
.then(() => {
    console.log("Banco de dados conectado :)")
})
.catch((error)=> console.log(error))

app.use("/api/autores", autorRoutes)

app.use(express.json());

conn.sync()

app.get('/', (request, response) => {
    response.status(200).json({mensagem: "Olá, mundo"})
})

export default app;