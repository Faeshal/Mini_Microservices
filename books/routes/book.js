require("pretty-error").start();
const express = require("express");
const router = express.Router();
const bookController = require("../controller/Book");

router.get("/api/books", bookController.getBooks);

router.post("/api/books", bookController.postBook);

router.get("/api/books/:id", bookController.getBook);

router.patch("/api/books/:id", bookController.updateBook);

router.delete("/api/books/:id", bookController.deleteBook);

module.exports = router;
