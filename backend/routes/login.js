const express = require("express");
const { loginHandler} = require("../handler/register"); 
const router = express.Router();


router.post("/login", async (req, res) => {
  const result = await loginHandler(req.body);

  res.status(result.status).json(result);
});



module.exports = router;
