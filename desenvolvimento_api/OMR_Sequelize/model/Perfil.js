import {DataTypes} from 'sequelize';
import { conn } from "../conn.js";
import  Usuario  from './Usuario.js';

const Perfil = conn.define(
    "perfis",
     {
        nickname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar_url:{
            type: DataTypes.STRING,
            allowNull: false
        },
        //relacionamento

        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'id'
            }
        }
     },
     {
        tableName: "perfis"
     }
    
);

//Associação dessas tabelas 1:1 - usuário tem perfil e perfil pertence a um usuário | (tipo de relacionamento)

//Usuario tem um perfil
Usuario.hasOne(Perfil, {foreignKey: 'usuario_id'})
//perfil pertence a um usuario
Perfil.belongsTo(Usuario, {foreignKey: 'usuario_id'})

export default Perfil;