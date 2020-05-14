const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { id, title, image } = req.body;
    let query = `INSERT INTO recipes (spoonacular_id, title, image) 
    VALUES ($1::integer, $2::text, $3::text);`;

    db.query(query, [id, title, image])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
