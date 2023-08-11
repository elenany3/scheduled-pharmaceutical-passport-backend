const router = require("express-promise-router")();
const { validate } = require("../middleware/validator");
const { jwt } = require("../services/strategies");
const { createSchema } = require("../schema/localMinistryOfHealth/create");
const {
  create,
  delete: deleteUser,
  getAll,
} = require("../controllers/localMinistryOfHealth");
router.post("/", validate(createSchema), jwt, create);
router.delete("/:address", jwt, deleteUser);
router.get("/", jwt, getAll);
exports.lMHRouter = router;
