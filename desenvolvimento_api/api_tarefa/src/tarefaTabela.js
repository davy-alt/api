import { DataTypes } from "sequelize";
import { conn } from "./sequelize.js";
import setorTabela from "./tabelaSetor.js";
/** payload
 * {id, tarefa, descricao, situacao, created_at, updated_at}
 */
const tabelaTarefa = conn.define(
  "Tarefa",
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    tarefa: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },
    descricao: {
        type: DataTypes.STRING
    },
    situacao: {
        type: DataTypes.ENUM('pendente', 'concluida'),
        defaultValue: 'pendente',
        allowNull: false
    },
    setor_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: setorTabela,
        key: 'id'
      },
    }
  },
  {
    tableName: 'tarefas',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);
setorTabela.hasMany(tabelaTarefa, {foreignKey: 'setor_id'})
tabelaTarefa.belongsTo(setorTabela, {foreignKey: 'setor_id'})
export default tabelaTarefa;