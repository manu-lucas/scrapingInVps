const Titular = require("../models/titular");
const Representante = require("../models/representante")
const Actividad = require("../models/actividad")
const Periodos = require("../models/periodos.js")
const Regimen = require("../models/regimen.js")
const sequelize = require("../config/db");



async function saveData(dataClient) {

  
  const companyRepresentatives = dataClient[0];
  const addressCompany = dataClient[1]
  const companyOwner = dataClient[2];
  const companyActivity = dataClient[3];
  const periodsImg = dataClient[4];
  const regimenTributario = dataClient[5]

  const { owner, rut } = companyOwner
  const { adress } = addressCompany
  const rutTitular = rut


try{
  const datos = await Titular.create({
    name: owner,
    address: adress,
    rut: rut
  });

 

  try {

    function formatearFecha(fechaConGuion) {
      // Parsear la fecha
      const partesFecha = fechaConGuion.split('-');
      const fechaObjeto = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`);
      // Formatear la fecha a 'YYYY-MM-DD'
      const fechaFormateada = fechaObjeto.toISOString().split('T')[0];
      return fechaFormateada;
    }
    if (companyRepresentatives.length > 0) {
      if (Array.isArray(companyRepresentatives)) {
        for (const element of companyRepresentatives) {
          const representante = await Representante.create({
            name: element.nombre,
            rut_representants: element.rut.replace(/[^\d]/g, ''),
            fecha: formatearFecha(element.fecha),
          });

          await datos.addRepresentante(representante);
        }
      }
    } else {
      const representante = await Representante.create({
        name: companyRepresentatives.nombre,
        rut_representants: (companyRepresentatives.rut).replace(/[^\d]/g, ''),
        fecha: formatearFecha(companyRepresentatives.fecha),
      });

      await datos.addRepresentante(representante);
    }

  } catch (error) {
    console.log(error)
  }
/* -------------------------*/



  // Crear una Actividad asociada al Titular
  const nameActivity = companyActivity["Glosa descriptiva de actividades económicas"]
  const act = await Actividad.create({
    name: nameActivity,
    rut_titular: rutTitular
  });

  // Crear un Periodo asociado al Titular
  const imgPeriodos = periodsImg.screenshot
  const periodos = await Periodos.create({
    image: imgPeriodos,
    rut_titular: rutTitular
  });


  let nombre_regimen = (regimenTributario[0] !== (null || undefined)) ? regimenTributario[0] : null;
  let contabilidad = (regimenTributario[1] !== (null || undefined)) ? regimenTributario[1] : null;

  const regimen = await Regimen.create({
    name: nombre_regimen,
    contabilidad: contabilidad,
    rut_titular: rutTitular
  });

  // console.log("aaaaaaaaaaaa", datos.toJSON())
}catch(error){
  console.log(error)
}
}





module.exports = saveData