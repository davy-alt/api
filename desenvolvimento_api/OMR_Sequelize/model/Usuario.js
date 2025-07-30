import {DataTypes} from 'sequelize';
import { conn } from "../conn.js";

const Usuario = conn.define(
    "Usuarios",
     {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
     },
     {
        tableName: "usuarios"
     }
    
);

export default Usuario;