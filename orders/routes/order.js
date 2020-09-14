require("pretty-error").start();
const express = require("express");
const router = express.Router();
const orderController = require("../controller/order");

router.get("/api/orders", orderController.getOrders);

router.post("/api/orders", orderController.postOrder);

router.get("/api/orders/:id", orderController.getOrder);

module.exports = router;
