require("pretty-error").start();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const chalk = require("chalk");
const morgan = require("morgan");
const mongoose = require("mongoose");
const PORT = 2000;
const CONNECTION_URI = "mongodb://localhost:27017/microservices_customers";
const customerRoutes = require("./routes/customer");

// * Main
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// * Routing
app.get("/", (req, res) => {
  res.json({ succes: true, message: "Hello From Customer" });
});

app.use(customerRoutes);

// * Database Connection
mongoose.connect(
  CONNECTION_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.error(err);
    }
    console.log(chalk.blueBright("MongoDB UP : Customer Service"));
  }
);

app.listen(PORT, (err) => {
  if (err) {
    console.error(chalk.red.inverse(err));
  }
  console.log(chalk.greenBright.inverse(`Customer Service Up : ${PORT}`));
});
