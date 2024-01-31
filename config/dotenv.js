require('dotenv').config()
// console.log(process.env)


 const varDeEntorno = {
    USER_DB_SQL: process.env.USER_DB_SQL,
    TABLE_DB_SQL: process.env.TABLE_DB_SQL,
    KEY_DB_SQL: process.env.KEY_DB_SQL,
}
module.exports=varDeEntorno