// import sequelize and assign it to the variable Sequelize
const Sequelize = require("sequelize");

// instantiate sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "library.db"
});

// create new object with sequelize (db instance), Sequelize (dependency), and an emmpty models object and assign it to variable db
const db = {
  sequelize,
  Sequelize,
  models: {},
};

// require Book model from book.js file and add it to the models object of the db object
db.models.Book = require("./models/book.js")(sequelize, Sequelize);

// define exports
module.exports = db;