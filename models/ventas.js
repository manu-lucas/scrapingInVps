const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ventas = sequelize.define('Ventas', {

    id_ventas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ejecutivo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    asesor: {
        type: DataTypes.STRING, // Agregar una coma aquí
        allowNull: false // allowNull defaults to true
    },
    plan: {
        type: DataTypes.STRING, // Agregar una coma aquí
        allowNull: false // allowNull defaults to true
    },
    servicio_adicional: {
        type: DataTypes.STRING, // Agregar una coma aquí
        allowNull: false // allowNull defaults to true
    },



}, {
    timestamps: false,
    freezeTableName: true,
    // Other model options go here
});


// (async () => {
//   await sequelize.sync({});
//   console.log('Modelo Representante sincronizado con la base de datos.');
// })();



module.exports = Ventas