const express = require("express");
const {registerHandler} = require("../handler/register"); 
const router = express.Router();



router.post("/register", async (req, res) => {
  const result = await registerHandler(req.body);
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
});

module.exports = router;
