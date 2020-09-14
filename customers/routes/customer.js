require("pretty-error").start();
const express = require("express");
const router = express.Router();
const customerController = require("../controller/customer");

router.get("/api/customers", customerController.getCustomers);

router.post("/api/customers", customerController.postCustomer);

router.get("/api/customers/:id", customerController.getCustomer);

router.delete("/api/customers/:id", customerController.deleteCustomer);

module.exports = router;
