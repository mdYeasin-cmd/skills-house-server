import { Sequelize } from "sequelize";
import config from "../config/index.js";

export const sequelize = new Sequelize({
    username: config.database_username,
    password: config.database_password,
    database: config.database_name,
    host: config.database_host,
    dialect: config.database_dialect,
    // logging: console.log,
});

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

// Export the sequelize instance
export default sequelize;
