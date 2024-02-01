const express = require("express");
const router = express.Router()
const { writeFileSync } = require("fs");  // Agrega esta línea para importar writeFileSync
const saveData = require("../controllers/saveData")


router.post("/", async (req, res) => {
  const dataClient = req.body;

try {
  if(dataClient.length === 6){
    const data =  await saveData(dataClient)
    res.status(200).send("Save with succesfuly");
  }else{
    res.status(500).send("Error en saveInfo");
  }
 
} catch (error) {
  console.log(error, "error en la informacion a guardar")
}
  
});



module.exports = router