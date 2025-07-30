import {DataTypes} from 'sequelize';
import { conn } from "../conn.js";
import  Usuario  from './Usuario.js';

const Publicacao = conn.define(
    "publicacao",
     {
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao:{
            type: DataTypes.STRING,
            allowNull: false
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Usuario,
                key: 'id'
            }
        }
     }, 
     {
        tableName: 'publicacao'
     }
);
//Associação 1:N (1 para muitos)
//Usuario tem muitas ou varias publicacoes  
Usuario.hasMany(Publicacao, {foreignKey: 'usuario_id'})
//Publicacoes pertence a um usuario
Publicacao.belongsTo(Usuario, {foreignKey: 'usuario_id'})

export default Publicacao;