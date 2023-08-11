const {
    create,
    delete: deleteUser,
    getAll
  } = require("../services/doctor");
  
  const { controller } = require("../middleware/controller");
  
  module.exports = {
    create: controller(create),
    delete: controller(deleteUser),
    getAll: controller(getAll),
  };
  