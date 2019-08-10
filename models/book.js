// require sequelize
const Sequelize = require("sequelize");
// instantiate sequelize
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "library.db"
});

class Book extends Sequelize.Model {}
// declare properties with data types
Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    author:  {
        type: Sequelize.STRING,
        allowNull: false,
    },
    genre: Sequelize.STRING,
    year:  Sequelize.INTEGER,
}, { sequelize });

(async () => {
    // Sync all tables
    await sequelize.sync();
    
    try {

    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
})();