const Titular = require("../models/titular");
const Representante = require("../models/representante");
const Actividad = require("../models/actividad");
const Periodos = require("../models/periodos.js");
const Regimen = require("../models/regimen.js");
const { a, b } = require("../uploads/in.js");

async function saveData() {
  const dataClient = a;
  // console.log("aca llega ", dataClient);
  const [
    companyRepresentatives,
    addressCompany,
    companyOwner,
    companyActivity,
    periodsImg,
    regimenTributario,
  ] = dataClient;
  const { owner, rut } = companyOwner;
  const { adress } = addressCompany;

  try {
    const titular = await crearTitular(owner, adress, rut);

    try {
      if (companyRepresentatives.length > 0) {
        if (Array.isArray(companyRepresentatives)) {
          for (const element of companyRepresentatives) {

            const representanteExistente = await Representante.findOne({
              where: {  rut_representant: element.rut },
          });
            if (representanteExistente){
              // await titular.addRepresentante(representanteExistente);
              const asociacion = await titular.addRepresentante(representanteExistente, {
                through: { fecha_alta: formatearFecha(element.fecha) },
              });

            }else {
              const representante = await crearRepresentante(
                element.nombre,
                element.rut
              );
              // await titular.addRepresentante(representante);
              const asociacion = await titular.addRepresentante(representante, {
                through: { fecha_alta: formatearFecha(element.fecha) },
              });
            }
          }
        }
      } else {
        /* guarda aca , puedo no tener array de representante , y aca esta tomando el objeto con 1*/
        if (companyRepresentatives.nombre) {
          const representanteExistente = await Representante.findOne({
            where: {  rut_representant: companyRepresentatives.rut
            },
        });
        if (representanteExistente){
          // await titular.addRepresentante(representanteExistente);
          const asociacion = await titular.addRepresentante(representanteExistente, {
            through: { fecha_alta: formatearFecha(companyRepresentatives.fecha) },
          });
        }else{
          const representante = await crearRepresentante(
            companyRepresentatives.nombre,
            companyRepresentatives.rut
          );
          // await titular.addRepresentante(representante);
          const asociacion = await titular.addRepresentante(representante, {
            through: {
              fecha_alta: formatearFecha(companyRepresentatives.fecha),
            },
          });
        }
        }
      }
    } catch (error) {
      console.log(error);
    }
    /* -------------------------*/

    // Crear una Actividad asociada al Titular
    const nameActivity =
      companyActivity["Glosa descriptiva de actividades económicas"];
    await crearActividad(nameActivity, rut);

    // Crear un Periodo asociado al Titular
    const imgPeriodos = periodsImg.screenshot;
    await crearPeriodo(imgPeriodos, rut);

    let nombre_regimen =
      regimenTributario[0] !== (null || undefined)
        ? regimenTributario[0]
        : null;
    let contabilidad =
      regimenTributario[1] !== (null || undefined)
        ? regimenTributario[1]
        : null;
    // Creamos el regimen
    await crearRegimenTributario(nombre_regimen, contabilidad, rut);
  } catch (error) {
    console.log("error al guardar en base de datos", error);
  }
}
// saveData();


module.exports = saveData;

async function crearTitular(owner, adress, rut) {
  let datos = await Titular.create({
    name: owner,
    address: adress,
    rut: rut,

  });
  return datos;
}

function formatearFecha(fechaConGuion) {
  // Parsear la fecha
  const partesFecha = fechaConGuion.split("-");
  const fechaObjeto = new Date(
    `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`
  );
  // Formatear la fecha a 'YYYY-MM-DD'
  const fechaFormateada = fechaObjeto.toISOString().split("T")[0];
  return fechaFormateada;
}

async function crearRepresentante(name, rut) {
  let representante = await Representante.create({
    name: name,
    rut_representant: rut,
  });
  return representante;
}

async function crearActividad(name, rut) {
  let actividad = await Actividad.create({
    name: name,
    rut_titular: rut,
  });
  return actividad;
}

async function crearPeriodo(img, rut) {
  let periodos = await Periodos.create({
    image: img,
    rut_titular: rut,
  });
  return periodos;
}

async function crearRegimenTributario(name, conta, rut) {
  let regimen = await Regimen.create({
    name: name,
    contabilidad: conta,
    rut_titular: rut,
  });
  return regimen;
}
