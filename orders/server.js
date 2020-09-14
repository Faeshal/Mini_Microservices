require("pretty-error").start();
const express = require("express");
const app = express();
const cors = require("cors");
const chalk = require("chalk");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const PORT = 3000;
const CONNECTION_URI = "mongodb://localhost:27017/microservices_orders";
const orderRoutes = require("./routes/order");

// * Main
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// * Routing
app.get("/", (req, res) => {
  res.json({ succes: true, message: "Hello From Order" });
});

app.use(orderRoutes);

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
    console.log(chalk.blueBright("MongoDB UP : Orders Service"));
  }
);

app.listen(PORT, (err) => {
  if (err) {
    console.error(chalk.red.inverse(err));
  }
  console.log(chalk.greenBright.inverse(`Book Service Up : ${PORT}`));
});
