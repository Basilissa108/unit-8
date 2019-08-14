// define exports with the book model and appropriate data types
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("book", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        author:  {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        genre: Sequelize.STRING,
        year:  Sequelize.INTEGER
    });
};