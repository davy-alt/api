import {DataTypes} from 'sequelize';
import { conn } from "../conn.js";
import  Usuario  from './Usuario.js';
import  Publicacao  from './Publicacao.js';

const Comentario = conn.define(
    "Comentarios",
     {
        comentario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        usuario_id:{
            type: DataTypes.STRING,
            allowNull: false,

            references:{
            model: Usuario,
            key:"id"
        }
            
        },
        publicacao_id:{
            type: DataTypes.INTEGER,
            allowNull: false,

            references: { 
                model: Publicacao,
                key:"id"
            }
        }
     }, 
     {
        tableName: "comentarios"
     })

Usuario.hasMany(Comentario, {foreignKey: 'usuario_id'})
Comentario.belongsTo(Usuario, {foreignKey: 'usuario_id'})

Publicacao.hasMany(Comentario, {foreignKey: 'publicacao_id'})
Comentario.belongsTo(Publicacao, {foreignKey: 'publicacao_id'})


export default Comentario;