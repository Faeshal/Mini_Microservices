require("pretty-error").start();
const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const mongoose = require("mongoose");

// * @route GET /api/orders
// @desc    Get All orders
// @access  Public
exports.getOrders = asyncHandler(async (req, res, next) => {
  const order = await Order.find().lean();
  if (order.length === 0) {
    return res
      .status(404)
      .json({ success: true, message: "Order Data is Empty" });
  }

  res.status(200).json({ success: true, total: order.length, data: order });
});

// * @route POST /api/orders
// @desc    Insert New Order
// @access  Public
exports.postOrder = asyncHandler(async (req, res, next) => {
  let { customerId, bookId, deliveryDate } = req.body;
  customerId = mongoose.Types.ObjectId(customerId);
  bookId = mongoose.Types.ObjectId(bookId);

  // * Validation
  if (!customerId || !bookId || !deliveryDate) {
    return res
      .status(400)
      .json({ success: false, message: "Id & Date is Required" });
  }

  // * Push data to mongodb
  const order = new Order({
    customerId,
    bookId,
    deliveryDate,
  });
  const result = await order.save();

  res.status(200).json({ success: true, data: result });
});

// * @route GET /api/orders/:id
// @desc    Get Orders by id
// @access  Public
exports.getOrder = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id);

  const bookService = "http://localhost:1000/api/books/";
  const customerService = "http://localhost:2000/api/customers/";

  const book = await axios.get(bookService + order.bookId);
  const customer = await axios.get(customerService + order.customerId);

  const result = {
    _id: order._id,
    customer: customer.data.data,
    book: book.data.data,
    intialDate: order.intialDate,
    deliveryDate: order.deliveryDate,
  };

  res.status(200).json({ success: true, data: result });
});
