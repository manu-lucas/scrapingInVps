const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const RegimenTributario = sequelize.define('RegimenTributario', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contabilidad:{
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true,

    // Other model options go here
  });
  
  (async () => {
    await sequelize.sync({});
    console.log('Modelo Regimen sincronizado con la base de datos.');
  })();
  

  module.exports = RegimenTributario
