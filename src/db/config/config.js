import config from "../../config/index.js";

export default {
  development: {
    username: config.database_username,
    password: config.database_password,
    database: config.database_name,
    host: config.database_host,
    dialect: config.database_dialect
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}