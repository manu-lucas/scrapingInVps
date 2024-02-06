const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ClienteVentas = sequelize.define('ClienteVentas', {

   
    fecha_consulta: {
        type: DataTypes.DATE, 
        // Agregar una coma aquí
        allowNull: false // allowNull defaults to true
    },
    contrato: {
        type: DataTypes.BOOLEAN, // Agregar una coma aquí
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



module.exports = ClienteVentas