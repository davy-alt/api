import { DataTypes } from "sequelize";
import conn from "./conn.js";
import Responsaveis from "./responsaveis.js";

const alunoTabela = conn.define("Aluno",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        ra: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [11, 20]
            }
        },
        nome:{
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100]
            }
        },
        email: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },

        responsavel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Responsaveis,
                key: "id"
            }
        }
    },
    {
        tableName: 'alunos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Responsaveis.hasMany(alunoTabela, {foreignKey: "responsavel_id"})
alunoTabela.belongsTo(Responsaveis, {foreignKey: "responsavel_id"})

export default alunoTabela;
