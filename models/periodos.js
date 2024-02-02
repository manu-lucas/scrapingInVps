const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Periodos = sequelize.define('Periodos', {
    // Model attributes are defined here
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
      // defaultValue: 'no tiene periodos'
    }
  }, {
    timestamps: false,
    freezeTableName: true,

    // Other model options go here
  });

  
(async () => {
  await sequelize.sync({});
  console.log('Modelo Periodos sincronizado con la base de datos.');
})();



  module.exports=  Periodos