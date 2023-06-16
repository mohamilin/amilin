import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Kontribusi = db.define(
  "Kontribusi",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    aksi_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Aksi",
        key: "id",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kota: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telepon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);
Kontribusi.associate = function (models) {
  Kontribusi.belongsTo(models.Aksi, { foreignKey: "aksi_id" });
  console.log(models);
};
Kontribusi.associate = function (models) {
  Kontribusi.belongsTo(models.User, { foreignKey: "user_id" });
  console.log(models);
};

export default Kontribusi;

// (async () => {
//   await db.sync();
// })();
