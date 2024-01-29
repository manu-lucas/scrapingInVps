const dotenv = require("dotenv");

dotenv.config();

module.exports.varDeEntorno = {
    USER_DB_SQL: process.env.USER_DB_SQL,
    TABLE_DB_SQL: process.env.TABLE_DB_SQL,
    KEY_DB_SQL: process.env.KEY_DB_SQL,
};