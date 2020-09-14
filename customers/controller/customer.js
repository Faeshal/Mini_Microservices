require("pretty-error").start();
const Customer = require("../models/Customer");
const asyncHandler = require("express-async-handler");

// * @route GET /api/customers
// @desc    Get All Customers
// @access  Public
exports.getCustomers = asyncHandler(async (req, res, next) => {
  const customer = await Customer.find().lean();
  if (customer.length === 0) {
    return res
      .status(404)
      .json({ success: true, message: "Customer Data is Empty" });
  }
  res
    .status(200)
    .json({ success: true, total: customer.length, data: customer });
});

// * @route GET /api/customers/:id
// @desc    Get Customers by id
// @access  Public
exports.getCustomer = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);
  if (!customer) {
    return res
      .status(404)
      .json({ success: true, message: `No Book Data with id ${id}` });
  }
  res.status(200).json({ success: true, data: customer });
});

// * @route POST /api/customers
// @desc    Insert New Customers
// @access  Public
exports.postCustomer = asyncHandler(async (req, res, next) => {
  const { name, age, address } = req.body;

  // * Validation
  if (!name || !age || !address) {
    return res
      .status(400)
      .json({ success: false, message: "Title, Author & Address is Required" });
  }

  // * Push data to mongodb
  const customer = new Customer({
    name,
    age,
    address,
  });
  const result = await customer.save();

  res.status(200).json({ success: true, data: result });
});

// * @route DELETE /api/customers/:id
// @desc    Delete Customer by id
// @access  Public
exports.deleteCustomer = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) {
    return res.status(404).json({
      success: false,
      message: `No Customer With ID: ${id}`,
    });
  }
  res
    .status(200)
    .json({ success: true, message: "Customer Succesfull Delete" });
});
