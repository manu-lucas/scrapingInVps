const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TitularRepresentante = sequelize.define('TitularRepresentante', {
    fecha_alta: {
        type: DataTypes.DATE, 
        allowNull: true // allowNull defaults to true
      },    
  },{  timestamps: false,
  });

//   // (async () => {
//   //   await sequelize.sync({});
//   //   console.log('Modelo TitularRepre sincronizado con la base de datos.');
//   // })();


module.exports = TitularRepresentante