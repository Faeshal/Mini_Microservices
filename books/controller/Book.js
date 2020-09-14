require("pretty-error").start();
const Book = require("../models/Book");
const asyncHandler = require("express-async-handler");

// * @route GET /api/books
// @desc    Get All Books
// @access  Public
exports.getBooks = asyncHandler(async (req, res, next) => {
  const book = await Book.find().lean();
  if (book.length === 0) {
    return res
      .status(404)
      .json({ success: true, message: "Book Data is Empty" });
  }
  res.status(200).json({ success: true, total: book.length, data: book });
});

// * @route GET /api/books/:id
// @desc    Get Book by id
// @access  Public
exports.getBook = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  if (!book) {
    return res
      .status(404)
      .json({ success: true, message: `No Book Data with id ${id}` });
  }
  res.status(200).json({ success: true, data: book });
});

// * @route POST /api/books
// @desc    Insert New Book
// @access  Public
exports.postBook = asyncHandler(async (req, res, next) => {
  const { title, author, numberPages, publisher } = req.body;

  // * Validation
  if (!title || !author) {
    return res
      .status(400)
      .json({ success: false, message: "Title & Author is Required" });
  }

  // * Push data to mongodb
  const book = new Book({
    title,
    author,
    numberPages,
    publisher,
  });
  const result = await book.save();

  res.status(200).json({ success: true, data: result });
});

// * @route PUT /api/book/:id
// @desc    Update Book
// @access  Public
exports.updateBook = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  if (!book) {
    return res
      .status(404)
      .json({ success: false, message: "No book With This ID" });
  }

  const result = await Book.findByIdAndUpdate(id, req.body);
  res.status(200).json({ success: true, data: result });
});

// * @route DELETE /api/books/:id
// @desc    Delete Book by id
// @access  Public
exports.deleteBook = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: `No Book With ID: ${id}`,
    });
  }
  res.status(200).json({ success: true, message: "Book Succesfull Delete" });
});
