
// const { Sequelize, DataTypes } = require("sequelize");
// const  {varDeEntorno}  = require("./dotenv");

// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize(varDeEntorno.TABLE_DB_SQL, varDeEntorno.USER_DB_SQL, varDeEntorno.KEY_DB_SQL, {
//   host: "localhost",
//   dialect: "mysql",
//   logging: false,
//   // force: true
// });



// async function testBDatos() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }
// testBDatos();

//module.exports = sequelize;