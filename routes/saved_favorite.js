const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
   console.log(req.body)
    res.send("test")

    // let query = `INSERT INTO recipes (user_id, recipe_name, picture, description, ingredients, instruction) VALUES ('1', 'BBQ', 'picture', 'description', 'ingredients','instruction') `;
    
    // db.query(query)
    //   .then((data) => {
    //     // console.log(data)
    //     res.json(data.rows);
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });
  });

  return router;
};
