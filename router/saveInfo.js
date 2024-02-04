const express = require("express");
const router = express.Router()
const { writeFileSync } = require("fs");  // Agrega esta línea para importar writeFileSync
const saveData = require("../controllers/saveData")


router.post("/", async (req, res,next) => {
  const dataClient = req.body;
console.log(dataClient)
  try {
    if (dataClient.length === 6) {
      const data = await saveData(dataClient)
      res.status(200).send("Save with succesfuly");
    } else {
      res.status(500).send("Error en saveInfo,array de data incompleto");
    }

  } catch (error) {
    console.log("error en la informacion a guardar", error)
    next(error);

  }

});



module.exports = router