const {
    create,
    delete: deleteDrug,
    getAll
  } = require("../services/prohibitedDrug");
  
  const { controller } = require("../middleware/controller");
  
  module.exports = {
    create: controller(create),
    delete: controller(deleteDrug),
    getAll: controller(getAll),
  };
  