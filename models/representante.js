const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Representante = sequelize.define('Representante', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'no tiene representante'
    },
    rut_representant: {
      type: DataTypes.STRING, // Agregar una coma aquí
      primaryKey: true,
      defaultValue: 'null',

      allowNull: true // allowNull defaults to true
    },
    fecha: {
      type: DataTypes.DATE, 
      allowNull: true // allowNull defaults to true
    },
  
    // id_represents: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   // autoIncrement:true
    // }
  }, {
    timestamps: false,
    freezeTableName: true,
    // Other model options go here
  });

  
(async () => {
  await sequelize.sync({});
  console.log('Modelo Representante sincronizado con la base de datos.');
})();



  module.exports=  Representante