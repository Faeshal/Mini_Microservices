require("pretty-error").start();
const express = require("express");
const app = express();
const cors = require("cors");
const chalk = require("chalk");
const helmet = require("helmet");
const mongoose = require("mongoose");
const PORT = 1000;
const CONNECTION_URI = "mongodb://localhost:27017/microservices_books";
const bookRoutes = require("./routes/book");

// * Main
app.use(helmet());
app.use(cors());
app.use(express.json());

// * Routing
app.get("/", (req, res) => {
  res.json({ succes: true, message: "Docs Goes Here" });
});

app.use(bookRoutes);

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
    console.log(chalk.blueBright("MongoDB UP : Books Service"));
  }
);

app.listen(PORT, (err) => {
  if (err) {
    console.error(chalk.red.inverse(err));
  }
  console.log(chalk.greenBright.inverse(`Book Service Up : ${PORT}`));
});
