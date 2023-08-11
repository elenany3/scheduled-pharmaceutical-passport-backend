const {
    create,
    delete: deleteDrug,
    getbyPatient,
    get
  } = require("../services/prescription");
  
  const { controller } = require("../middleware/controller");
  
  module.exports = {
    create: controller(create),
    delete: controller(deleteDrug),
    getbyPatient: controller(getbyPatient),
    get: controller(get),
  };
  