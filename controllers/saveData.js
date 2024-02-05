const Titular = require("../models/titular");
const Representante = require("../models/representante")
const Actividad = require("../models/actividad")
const Periodos = require("../models/periodos.js")
const Regimen = require("../models/regimen.js")
const sequelize = require("../config/db");
const {a,b} = require("../uploads/in.js");
const TitularRepresentante = require("../models/titularrepresentante.js");


async function saveData() {

  const dataClient = b
  console.log("aca llega ", dataClient)
  const companyRepresentatives = dataClient[0];
  const addressCompany = dataClient[1]
  const companyOwner = dataClient[2];
  const companyActivity = dataClient[3];
  const periodsImg = dataClient[4];
  const regimenTributario = dataClient[5]


  const { owner, rut } = companyOwner
  const { adress } = addressCompany
  const rutTitular = rut


  try {



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


      // Representante.findOne({
      //    where: { rut_representant: '123' }
      //     })

      if (companyRepresentatives.length > 0) {
        if (Array.isArray(companyRepresentatives)) {
          for (const element of companyRepresentatives) {
            const representante = await Representante.create({
              name: element.nombre,
              rut_representant: element.rut,
              // fecha: formatearFecha(element.fecha),
            });

            await datos.addRepresentante(representante);
            const asociacion = await datos.addRepresentante(representante, { through: { fecha_alta: formatearFecha(element.fecha) } });

          }
        }

      } else {
        /* guarda aca , puedo no tener representante , y aca esta tomando el objeto con 1*/
        if (companyRepresentatives.nombre) {
          const representante = await Representante.create({
            name: companyRepresentatives.nombre,
            rut_representant: (companyRepresentatives.rut),
            // fecha: formatearFecha(companyRepresentatives.fecha),
          });


          await datos.addRepresentante(representante);

          const asociacion = await datos.addRepresentante(representante, { through: { fecha_alta: formatearFecha(companyRepresentatives.fecha) } });

        
        }
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
  } catch (error) {
    console.log("error al guardar en base de datos", error)
  }
}


saveData() 

module.exports = saveData