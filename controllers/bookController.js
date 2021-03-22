const Book = require("../models/bookModel");
const axios = require("axios");

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

  searchBooks: async (req, res) => {
    console.log("searched books");
    const searchParam = req.body.searchInput;
    const KEY = process.env.API_KEY;
    try {
      const searching = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchParam}&key=${KEY}&maxResults=20`
      );
      res.json(searching);
      console.log("searching ", searching);
    } catch (err) {
      console.log("get search err", err);
      res.send("couldn't search books", err);
    }
  },
};
