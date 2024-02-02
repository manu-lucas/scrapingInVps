const express = require("express");
const router = express.Router()

router.post("/", async (req, res) => {
  const facturacionClient = req.body;
  res.status(200).send("Save with succesfuly");
});



module.exports = router