const { Server } = require("socket.io");

const normalizeOrigin = (value) => String(value || "").replace(/\/+$/, "");
const allowedOrigins = [
  "https://demo.my-hotels.uz",
  ...(process.env.CLIENT_ORIGINS || "").split(","),
]
  .map((origin) => normalizeOrigin(origin.trim()))
  .filter(Boolean);

const io = (server) => {
  return new Server(server, {
    cors: {
      origin(origin, callback) {
        if (origin && allowedOrigins.includes(normalizeOrigin(origin))) {
          return callback(null, true);
        }
        return callback(new Error("Bu domen uchun Socket.IO ruxsati yo'q"));
      },
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  });
};

module.exports = io;
