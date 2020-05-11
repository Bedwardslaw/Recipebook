"use strict";

const Sequelize = require("sequelize");

const db = new Sequelize("recipelist", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 8889,
});

module.exports = (sequelize) => {
  class Recipe extends Sequelize.Model {}
  Recipe.init(
    {
      name: Sequelize.STRING,
      ingredients: Sequelize.TEXT,
      directions: Sequelize.TEXT,
    },
    { db, sequelize }
  );

  return Recipe;
};
