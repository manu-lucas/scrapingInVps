import { config } from "dotenv";
export const varDeEntorno = {
    USER_DB_SQL: process.USER_DB_SQL,
    TABLE_DB_SQL: process.TABLE_DB_SQL,
    KEY_DB_SQL: process.KEY_DB_SQL,
}
module.exports=varDeEntorno