const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controller/userController");

/* GET users listing. */
router.route("/getUsers").get(userController.getAll);
router
  .route("/register", [
    check("email", "Your email is not valid")
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail(),
    check("password", "Your password must be at least 4 characters")
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
  ])
  .post(userController.register);
router.route("/login").post(userController.login);
router.route("/getUser:id").get(userController.getById);
router.route("/updateUser:id").put(userController.update);
router.route("deleteUser").delete(userController.delete);

module.exports = router;

// CHECK if EMAIL IS UNIQUE
