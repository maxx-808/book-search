const router = require("express").Router();
const { searchBooks } = require("../controllers/bookController");

router.get("/", searchBooks);

module.exports = router;
