const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Actividad = sequelize.define('Actividad', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'no tiene actividad'
    }
  }, {
    timestamps: false,
    freezeTableName: true,

    // Other model options go here
  });

// (async () => {
//   await sequelize.sync({});
//   console.log('Modelo Actividad sincronizado con la base de datos.');
// })();



  module.exports=  Actividad