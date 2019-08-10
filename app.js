const express = require("express");
const path = require("path");
const Sequelize = require("sequelize");
// instantiate sequelize
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "library.db"
});

// instantiate express app
const app = express();
// set view engine to pug
app.set("view engine", "pug");
// serve static files
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

//get / - Home route should redirect to the /books route.
app.get("/", (req, res) => {
  res.redirect('/books'); 
});
//get /books - Shows the full list of books.
app.get("/books", (req, res) => {

});
//get /books/new - Shows the create new book form.
app.get("/books/new", (req, res) => {

});
//post /books/new - Posts a new book to the database.
app.post("/books/new", (req, res) => {

});
//get /books/:id - Shows book detail form.
app.get("/books/:id", (req, res) => {

});
//post /books/:id - Updates book info in the database.
app.post("/books/:id", (req, res) => {

});
//post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.
app.post("/books/:id/delete", (req, res) => {

});

// declare DB model
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

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))