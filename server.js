const app = require("./app");
const sequelize = require("./models");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("MySQL database connected successfully");

    app.listen(PORT, () => {
      console.log(`BalRaksha server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to MySQL:", error.message);
  }
};

startServer();
