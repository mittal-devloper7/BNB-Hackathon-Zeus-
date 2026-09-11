const http = require("http");

const app = require("./app");

const { sequelize, SupportMessage } = require("./models");

const { Server } = require("socket.io");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("MySQL database connected successfully");

    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("join-help", (helpRequestId) => {
        socket.join(`help-${helpRequestId}`);

        console.log(`Joined help-${helpRequestId}`);
      });

      socket.on("send-message", async (data) => {
        try {
          const savedMessage = await SupportMessage.create({
            helpRequestId: data.helpRequestId,

            senderId: data.senderId || null,

            message: data.message,
          });

          io.to(`help-${data.helpRequestId}`).emit("new-message", savedMessage);
        } catch (error) {
          console.error("Message save error:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    server.listen(PORT, () => {
      console.log(`BalRaksha server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to MySQL:", error.message);
  }
};

startServer();
