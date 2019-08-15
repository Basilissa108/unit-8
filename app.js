const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const db = require("./db/index.js");
const { Book } = db.models;

// instantiate express app
const app = express();
// set view engine to pug
app.set("view engine", "pug");
// serve static files
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

// make app use bodyparser for parsing application/json
app.use(bodyParser.json()); 
// make app use bodyparser for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

// redirect to /books route
app.get("/", (req, res) => {
  // redirect to url with pagesize and page params defaulted to 10 and 1
  res.redirect('/books/10/1'); 
});

// shows the full list of books.
app.get("/books", async (req, res) => {
  // redirect to url with pagesize and page params defaulted to 10 and 1
  res.redirect('/books/10/1'); 
});

app.get("/books/:pagesize/:page", async (req, res) => {
  // wrapping the code in a try catch block to handle errors
  try {
    // get pagination data from the requests params
    const pagesize = parseInt(req.params.pagesize);
    const page = parseInt(req.params.page);
    const offset = (page * pagesize) - pagesize;
    // get all books from db for the selected page
    const books = await Book.findAll({ offset: offset, limit: pagesize });
    // render index.pug and pass all books to it
    res.render("index.pug", { books: books, page: page });
  } catch(error) {
    res.render("error.pug", { message: error.message });
  }
});

// shows the create new book form.
app.get("/books/new", (req, res) => {
  // render new-book.pug
  res.render("new-book.pug");
});

// posts a new book to the database.
app.post("/books/new", async (req, res) => {
  // construct a temporary book object and assign it to the variable temp
  const temp = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year
  };
  // wrapping the code in a try catch block to handle errors
  try {
    await Book.create(temp);
    // after the book has been created, redirect to books overview
    res.redirect("/books");
  } catch (error) {
    // check if the error is a validation error, if so display validation errors in the form, otherwise redirect to a general error page
    if (error.name === "SequelizeValidationError") {
      // map over the errors in error.errors, and assign their message to the variable errors
      const errors = error.errors.map(err => err.message);
      res.render("new-book.pug", { book: temp, errors: errors });
    } else {
      res.render("error.pug", { message: error.message });
    }
  }
});

// shows book detail form.
app.get("/books/:id", async (req, res) => {
  // wrapping the code in a try catch block to handle errors
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("update-book.pug", { "book": book });
    } else {
      res.render("error.pug", { message: `We cannot find a book with the ID ${req.params.id}.` });
    }
  } catch(error) {
    res.render("error.pug", { message: error.message });
  }
});

// updates book info in the database.
app.post("/books/:id", async (req, res) => {
  // construct a temporary book object and assign it to the variable temp
  const temp = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year
  };
  // wrapping the code in a try catch block to handle errors
  try {
    // call Book.update with the new values and use the supplied book id to find the record in the database
    await Book.update(
      temp,
      { where: { id: req.params.id }}
    );
    // after the update has been completed, redirect to books overview
    res.redirect("/books");
  } catch (error) {
    // check if the error is a validation error, if so display validation errors in the form, otherwise redirect to a general error page
    if (error.name === "SequelizeValidationError") {
      // map over the errors in error.errors, and assign their message to the variable errors
      const errors = error.errors.map(err => err.message);
      res.render("update-book.pug", { book: temp, errors: errors });
    } else {
      res.render("error.pug", { message: error.message });
    }
  }
});

// deletes a book by id
app.post("/books/:id/delete", async (req, res) => {
  // wrapping the code in a try catch block to handle errors
  try {
    await Book.destroy({ where: { id: req.params.id }});
    res.redirect("/books");
  } catch (error) {
    res.render("error.pug", { message: error.message });
  }
});

// set up a fallback route to display a 404 error for not existing routes
app.get("*", (req, res) => {
  // set the response status to 404
  res.status(404);
  // render the page-not-found view
  res.render("page-not-found.pug");
});

// sync db instance
(async () => {
  db.sequelize.sync()
    .then(() => console.log("synced with db"))
    .catch(error => console.log(error));
})();

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`));