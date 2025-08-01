import { DataTypes } from "sequelize";
import  conn  from "./conn.js";

const tabelaResponsavel = conn.define(
  "Responsavel",
  {
    nome: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 18
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    grau_parentesco: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  },
  {
    tableName: "responsaveis",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

export default tabelaResponsavel;
