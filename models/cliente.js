const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cliente = sequelize.define('Cliente', {
    // Model attributes are defined here
    nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    razon_social: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    celular: {
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



module.exports = Cliente