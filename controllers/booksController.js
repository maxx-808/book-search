const Book = require("../models/bookModel");

module.exports = {
  //getting all saved books from db
  getSaved: async (req, res) => {
    console.log("got books");

    try {
      const allBooks = await Book.find();
      res.json(allBooks);
    } catch (err) {
      console.log("get books err", err);
      res.send("couldn't get books", err);
    }
  },

  saveBook: async (req, res) => {
    console.log("saved book");

    try {
      const newBook = new Book({
        title: req.title,
        authors: req.authors,
        description: req.description,
        image: req.image,
        link: req.link,
      });

      const successSave = await newBook.save();
      console.log(successSave);
      return true;
    } catch (err) {
      console.log("error saving ", err);
      return false;
    }
  },

  deleteBook: async (req, res) => {
    console.log("deleted book");

    try {
      const delBook = await Book.findById({ _id: req.params.id })
        .then((book) => book.remove())
        .then((book) => res.json(book));
    } catch (err) {
      console.log("error deleting ", err);
    }
  },
};
