import dotenv from "dotenv";

dotenv.config();

export default {
    node_env: process.env.NODE_ENV,
    database_username: process.env.DATABASE_USERNAME,
    database_password: process.env.DATABASE_PASSWORD,
    database_name: process.env.DATABASE_NAME,
    database_dialect: process.env.DATABASE_DIALECT,
    database_host: process.env.DATABASE_HOST,
    jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    jwt_reset_password_secret: process.env.JWT_RESET_PASSWORD_SECRET,
    jwt_reset_password_expires_in: process.env.JWT_RESET_PASSWORD_EXPIRES_IN,
    reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
}