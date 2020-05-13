const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //need to change to get recipe_id by user.id
    let query = `SELECT * FROM recipes where user.id=${userid}`;
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
