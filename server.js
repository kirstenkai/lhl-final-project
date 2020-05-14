require("dotenv").config();

const { Pool } = require("pg");

const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = new Pool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  port: process.env.DBPORT
});
db.connect();

//query to test db function.
// db.query('SELECT * FROM users').then(data => {
//   console.log(data.rows)
// })

app.use(cors());

//you need to write routes here V to import them to another files.
const userRoutes = require("./routes/users");
app.use("/users", userRoutes(db));

const savedRecipes = require("./routes/saved");
app.use("/api/saved", savedRecipes(db));

const inventory = require("./routes/inventory");
app.use("/api/inventory", inventory(db));

const customRecipes = require("./routes/customrecipes");
app.use("/api/customrecipes", customRecipes(db));

app.listen(port, () => console.log("Backend server live on " + port));

//testing routes in console!
app.get("/", (req, res) => {
  res.send({ message: "We did it!" });
});
