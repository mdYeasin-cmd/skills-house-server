import fs from "fs";
import path from "path";
import process from "process";
import { Sequelize, DataTypes } from "sequelize";
import configImport from "../db/config/config.js";
import appConfig from "../config/index.js";

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
  const modelFiles = fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
      );
    })

  const modelLoaders = [];

  modelFiles.forEach((file) => {
    modelLoaders.push(
      (async () => {
        try {
          const model = await import(`./${file}`);
          const namedModel = model.default(sequelize, DataTypes);
          db[namedModel.name] = namedModel;
          console.log("✅ Model Name: ", namedModel.name);
        } catch (err) {
          console.error(`❌ Failed to load model from file: ${file}`, err.message);
        }
      })()
    );
  });

  await Promise.all(modelLoaders);

  for (const modelName of Object.keys(db)) {
    if (db[modelName].associate) {
      try {
        db[modelName].associate(db);
      } catch (err) {
        console.error(`❌ Failed to associate model: ${modelName}`, err.message);
      }
    }
  }

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
} catch (error) {
  console.error("Error loading models:", error);
}

export default db;