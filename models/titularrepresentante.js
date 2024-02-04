const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TitularRepresentante = sequelize.define('TitularRepresentante', {
    rut_titular: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    rut_representante: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
    },
  });

  // (async () => {
  //   await sequelize.sync({});
  //   console.log('Modelo TitularRepre sincronizado con la base de datos.');
  // })();



module.exports = TitularRepresentante