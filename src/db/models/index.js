import fs from "fs";
import path from "path";
import process from "process";
import Sequelize from "sequelize";
import configImport from "../config/config.js";
import appConfig from "../../config/index.js";

const basename = path.basename(import.meta.url);
const env = appConfig.node_env;
const config = configImport[env];
const db = {};

let sequelize;
try {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
} catch (error) {
  console.error("Error connecting to database:", error);
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);

try {
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
      );
    })
    .forEach(async (file) => {
      const model = (await import(path.join(__dirname, file))).default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
      console.log(`Loaded model: ${model.name}`);
    });
} catch (error) {
  console.error("Error loading models:", error);
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;