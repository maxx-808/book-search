const router = require("express").Router();
const { getSaved, saveBook } = require("../controllers/dbController");

router.get("/", getSaved);
router.post("/", saveBook);

module.exports = router;
