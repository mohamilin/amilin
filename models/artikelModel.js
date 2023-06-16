import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const artikel = db.define(
  "Artikel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titleArticle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descArticle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashtag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc5: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc6: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc7: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc8: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc9: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc10: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
artikel.associate = (models) => {
  artikel.hasMany(models.Komentar, { foreignKey: "article_id" });
};

export default artikel;

// (async () => {
//   await db.sync();
// })();
