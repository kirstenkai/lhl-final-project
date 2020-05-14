const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    //table is called recipes
    db.query(`SELECT * FROM recipes;`)
      .then(data => {
        const recipes = data.rows;
        res.json(recipes);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
    router.delete("/:id", (req, res) => {
      db.query(
        `DELETE FROM recipes
  WHERE id = ($1) `,
        [req.params.id]
      ).then(response => {
        return res.json(response.rows[0] || null);
      });
    });
  });

  return router;
};
