const router = require("express-promise-router")();
const { validate } = require("../middleware/validator");
const { jwt } = require("../services/strategies");
const { createSchema } = require("../schema/prohibitedDrug/create");
const {
  create,
  delete: deleteDrug,
  getAll,
} = require("../controllers/prohibitedDrug");
router.post("/", validate(createSchema), jwt, create);
router.delete("/:name", jwt, deleteDrug);
router.get("/", jwt, getAll);
exports.prohibitedDrugRouter = router;
