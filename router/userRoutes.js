const express = require("express");
const router = express.Router()
const fs = require('fs').promises; // fs/promises no es compatible con require
const path = require('path');



router.get("/",async (req, res) => {
   res.sendFile(path.join(__dirname, "../public", "index.html"));
  
}
)



module.exports = router