const router = require("express-promise-router")();
const { validate } = require("../middleware/validator");
const { jwt } = require("../services/strategies");
const { createSchema } = require("../schema/prescription/create");
const {
  create,
  delete: deletePrescription,
  getbyPatient,
  get
} = require("../controllers/prescription");
router.post("/", validate(createSchema), jwt, create);
router.delete("/:id", jwt, deletePrescription);
router.get("/", jwt, get);
router.get("/:patientPassport", getbyPatient);
exports.prescriptionRouter = router;
