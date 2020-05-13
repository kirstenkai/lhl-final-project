const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //using TEST table here!! need to change to recipes after
    let query = `SELECT * FROM recipes`;
    console.log(query);
    db.query(query)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  

  return router;
};
