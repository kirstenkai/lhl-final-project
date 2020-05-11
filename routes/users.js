const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // router.post("/", (req, res) => {
  //   const { address } = req.body;
  //   db.query("INSERT INTO address (address) VALUES ($1) RETURNING *; ", [
  //     address,
  //   ]).then((res) => {
  //     return res.rows[0] || null;
  //   });
  //   res.redirect("/confirmation");
  // });

  router.get("/", (req, res) => {
    let query = `SELECT * FROM users`;
    console.log(query);
    db.query(query)
      .then((data) => {
      
        res.json({users: data.rows });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
