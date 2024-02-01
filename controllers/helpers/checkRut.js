const Titular = require("../../models/titular");
const Representante = require("../../models/representante")
const Actividad = require("../../models/actividad")
const Periodos = require("../../models/periodos.js")
const sequelize = require("../../config/db.js");

async  function comprobarRut(rut ){
    try{ 
        const usuarioExistente = await Titular.findOne({ where: { rut: rut },
            include: [Representante, Periodos,Actividad],

        });
        if (usuarioExistente) {
            return({databd:usuarioExistente.toJSON()})
        }
    }catch(error){
        console.log("hay un error en buscar el rut")
    }
   
}


module.exports = comprobarRut