const express = require("express");
const router = express.Router()
const { writeFileSync } = require("fs");  // Agrega esta línea para importar writeFileSync
const comprobarRut = require("../controllers/helpers/checkRut.js")
const runAllUsers = require("../modules/main.js")

router.post("/", async (req, res) => {
  try {
    const { rut, password } = req.body;
    let datanew = await comprobarRut(rut)
    if (datanew) {
      console.log("estoy")
      console.log(datanew)
      res.status(200).json(datanew);

    } else {

      const data = await runAllUsers(rut, password)
      res.status(200).json(data);
    }


  } catch (error) {
    console.log(error);
    res.send('<script>Swal.fire("Error", "Ha ocurrido un error en el proceso, vuelve a iniciar la consulta");</script>');
  }
});

module.exports = router