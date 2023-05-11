const router = require("express").Router();

router.get("/cart", (req, res) => {
  res.send("username");
});

module.exports = router;
