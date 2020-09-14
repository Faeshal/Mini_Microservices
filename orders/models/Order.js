const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  bookId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  intialDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("order", orderSchema);
