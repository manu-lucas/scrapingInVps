const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Representante = require('./representante')
const Actividad = require("./actividad")
const Periodos = require("./periodos")
const Regimen = require("./regimen")
const TitularRepresentante = require("./titularrepresentante")
const EtapaFacturacion = require("./etapafacturacion")
const Cliente = require("./cliente")
const Ventas = require("./ventas")
const ClienteVentas= require("./clienteventas")

const Titular = sequelize.define('Titular', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING, // Agregar una coma aquí
    allowNull: false // allowNull defaults to true
  },
  rut: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  type:{
    type:DataTypes.STRING,
    allowNull:true,
    defaultValue:"empresa"
  },
  clave:{
    type:DataTypes.INTEGER,
    allowNull:true,
    defaultValue: 222222

  },
}, {
  timestamps: false,
  freezeTableName: true,

  // Other model options go here
});

Titular.belongsToMany(Representante, { through: TitularRepresentante, foreignKey: "rut_titular", otherKey:"rut_representante"});
Representante.belongsToMany(Titular, { through: TitularRepresentante, foreignKey: "rut_representante", otherKey: "rut_titular"});
Titular.hasOne(Actividad, { foreignKey: 'rut_titular' });
Actividad.belongsTo(Titular, { foreignKey: 'rut_titular' });
Titular.hasOne(Periodos, { foreignKey: 'rut_titular' });
Periodos.belongsTo(Titular, { foreignKey: 'rut_titular' });
Titular.hasOne(Regimen,{foreignKey: 'rut_titular' });
Regimen.belongsTo(Titular, { foreignKey: 'rut_titular' });
Titular.hasMany(EtapaFacturacion,{ foreignKey: 'rut_titular' }); // Un titular puede tener muchas etapas
EtapaFacturacion.belongsTo(Titular,{ foreignKey: 'rut_titular' }); // Una etapa pertenece a un solo titular
Titular.belongsToMany(Cliente, { through: "TitularCliente", foreignKey: "rut_titular",  timestamps: false});
Cliente.belongsToMany(Titular, { through: "TitularCliente", foreignKey: "email",  timestamps: false});
Cliente.belongsToMany(Ventas, { through: ClienteVentas, foreignKey: "email"});
Ventas.belongsToMany(Cliente, { through: ClienteVentas, foreignKey: "id_ventas"});



  // (async () => {
  //   await sequelize.sync({});
  //   console.log('Modelo Titular sincronizado con la base de datos.');
  // })();



module.exports = Titular