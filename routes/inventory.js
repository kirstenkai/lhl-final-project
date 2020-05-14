const express = require("express");
const router = express.Router();

module.exports = db => {
  router.post("/", (req, res) => {
    console.log("req.body = ", req.body);

    const { user_id, item, expiryDate, daysleft } = req.body;
    db.query(
      "INSERT INTO inventory_items (user_id, name, expiry_date, daysleft) VALUES ($1, $2, $3, $4) RETURNING *; ",
      [user_id, item, expiryDate, daysleft]
    ).then(response => {
      return res.json(response.rows[0] || null);
    });

    // res.redirect("/inventory");
  });

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM inventory_items; `)
      .then(data => {
        const inventory = data.rows;
        res.json(inventory);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
