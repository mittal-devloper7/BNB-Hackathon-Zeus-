const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  },
);

const User = require("./user")(sequelize, DataTypes);
const Report = require("./report")(sequelize, DataTypes);
const RiskEvent = require("./riskevent")(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  Report,
  RiskEvent,
};

// Set up relationships
User.associate(db);
Report.associate(db);
RiskEvent.associate(db);

module.exports = db;
