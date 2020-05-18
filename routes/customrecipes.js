const express = require("express");
const router = express.Router();

module.exports = db => {
  router.post("/", (req, res) => {
    const {
      user_id,
      name,
      image,
      description,
      ingredients,
      instruction
    } = req.body;
    db.query(
      `INSERT INTO custom_recipes (user_id, name, image, description, ingredients, instruction) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *; `,
      [user_id, name, image, description, ingredients, instruction]
    ).then(response => {
      return res.json(response.rows[0] || null);
    });
  });

  router.delete("/:id", (req, res) => {
    db.query(
      `DELETE FROM custom_recipes 
      WHERE id = ($1) `,
      [req.params.id]
    ).then(response => {
      return res.json(response.rows[0] || null);
    });
  });

  router.get("/recipes/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM custom_recipes WHERE id = ${id} ORDER BY id DESC;`)
      .then((data) => {
        const recipes = data.rows[0];
        res.json(recipes);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:userId", (req, res) => {
    //table is called recipes
    db.query(`SELECT * FROM custom_recipes WHERE user_id = ($1);`, [
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
  return router;
};
