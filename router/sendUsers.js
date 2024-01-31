const express = require("express");
const router = express.Router()
const { writeFileSync } = require("fs");  // Agrega esta línea para importar writeFileSync
const comprobarRut = require("../controllers/helpers/checkRut.js")

// const Titular = require("../models/titular");
// const Representante = require("../models/representante")
// const Actividad = require("../models/actividad")
// const Periodos = require("../models/periodos.js")
// const sequelize = require("../config/db");
const runAllUsers = require("../modules/main.js")
const ErrorHandler = require("../services/errorHandler.js")

router.post("/", async (req, res) => {
  try {
    const { rut, password } = req.body;
    // const number= Number.parseInt(rut)
    let datanew = await comprobarRut(rut)
    if (datanew){
      console.log("estoy")
      console.log(datanew)
      res.status(200).json(datanew);

    }else{

          
        const data = await runAllUsers(rut, password)
        res.status(200).json(data);
      }


  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });// Enviar el mensaje de error al cliente
  }
});

module.exports = router