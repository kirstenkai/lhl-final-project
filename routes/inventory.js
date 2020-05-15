const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log("req.body = ", req.body);

    const { userId, item, expiryDate, daysleft } = req.body;
    db.query(
      `INSERT INTO inventory_items (user_id, name, expiry_date, daysleft) 
      VALUES ($1, $2, $3, $4) RETURNING *; `,
      [userId, item, expiryDate, daysleft]
    ).then((response) => {
      return res.json(response.rows[0] || null);
    });

    // res.redirect("http://localhost:3000/inventory");
  });

  router.get("/:userId", (req, res) => {
    db.query(`SELECT * FROM inventory_items WHERE user_id=($1)`, [
      req.params.userId,
    ])
      .then((data) => {
        const inventory = data.rows;
        res.json(inventory);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.delete("/:id", (req, res) => {
    db.query(
      `DELETE FROM inventory_items 
        WHERE id = ($1) `,
      [req.params.id]
    ).then((response) => {
      return res.json(response.rows[0] || null);
    });
  });

  return router;
};
