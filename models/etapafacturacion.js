const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EtapaFacturacion = sequelize.define('EtapaFacturacion', {
    // Model attributes are defined here
    etapa: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    compras: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    ventas: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    recibidas: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    emitidas: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },



}, {
    timestamps: false,
    freezeTableName: true,

    // Other model options go here
});


// (async () => {
//   await sequelize.sync({});
//   console.log('Modelo Periodos sincronizado con la base de datos.');
// })();



module.exports = EtapaFacturacion