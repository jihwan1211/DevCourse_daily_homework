const Sequelize = require("sequelize");
const sequelize = require("../db");

const Book = sequelize.define("books", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  img: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  form: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isbn: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  summary: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  detail: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  pages: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  contents: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  pub_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

module.exports = Book;
