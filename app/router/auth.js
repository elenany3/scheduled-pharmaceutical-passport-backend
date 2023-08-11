const router = require("express-promise-router")();
const { validate } = require("../middleware/validator");
const { loginSchema } = require("../schema/auth/login");
const {
  login,
  createAdmin,
} = require("../controllers/auth");
router.post("/admin", validate(loginSchema), createAdmin);
router.post("/login", validate(loginSchema), login);
exports.authRouter = router;
