const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(express.json());

app.use(cors());

const db = require("./models");

//Routers

const postRouter = require("./routes/Employee_table");
app.use("/employees", postRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("listening");
  });
});
