import dotenv from "dotenv";

dotenv.config();

export default {
    node_env: process.env.NODE_ENV,
    database_username: process.env.DATABASE_USERNAME,
    database_password: process.env.DATABASE_PASSWORD,
    database_name: process.env.DATABASE_NAME,
    database_dialect: process.env.DATABASE_DIALECT,
    database_host: process.env.DATABASE_HOST
}