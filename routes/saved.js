const express = require("express");
const router = express.Router();

module.exports = db => {
  router.post("/", (req, res) => {
    const { id, title, image, user_id } = req.body;
    let query = `INSERT INTO recipes (spoonacular_id, title, image, user_id) 
    VALUES ($1::integer, $2::text, $3::text, $4::text);`;

    db.query(query, [id, title, image, user_id])
      .then(data => {
        const id = data.rows     
        res.json(data.rows);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/:userId", (req, res) => {
    db.query(`SELECT * FROM recipes WHERE user_id = ($1) ORDER BY id DESC`, [
      req.params.userId
    ])
      .then(data => {
        const recipes = data.rows;
        res.json(recipes);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.delete("/:id", (req, res) => {
    db.query(
      `DELETE FROM recipes
          WHERE id = ($1)`,
      [req.params.id]
    ).then(response => {
      return res.json(response.rows[0] || null);
    });
  });
  return router;
};
