const Titular = require("../../models/titular");
const Representante = require("../../models/representante")
const Actividad = require("../../models/actividad")
const Periodos = require("../../models/periodos.js")
const Regimen = require("../../models/regimen.js")



async function comprobarRut(rut) {
    try {
        const usuarioExistente = await Titular.findOne({
            where: { rut: rut },
            attributes: ['name', 'address', 'rut'],
            include: [Representante, Actividad, Periodos, Regimen],
        });
        if (usuarioExistente) {
            return ({ databd: usuarioExistente.toJSON() })
        }
    } catch (error) {
        console.log("hay un error en buscar el rut",error)
    }

}


module.exports = comprobarRut