const dotenv = require("dotenv");
const envFound = dotenv.config();
if (!envFound) {
  throw new Error(" Couldn't find .env file!");
}

module.exports = {
  port: parseInt(process.env.PORT, 10),
  api: {
    prefix: "/",
  },
  serverUrl: process.env.SERVER_URL,
  jwtSecret: "healthcare_secret_key",
  pagination: {
    pageSize: 20,
  },
  roles: {
    admin: "admin",
    lmh: "lmh",
    doctor: "doctor",
  },
};
