const {
    login,
    createAdmin
  } = require("../services/auth");
  
  const { controller } = require("../middleware/controller");
  
  module.exports = {
    login: controller(login),
    createAdmin: controller(createAdmin),
  };
  