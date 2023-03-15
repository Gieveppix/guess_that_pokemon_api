const express = require("express");
const router = express.Router();
const blogController = require("../controller/pokemonController");

/* GET home page. */
router.route("/").get(blogController.getAll).post(blogController.create);
router
  .route("/:id")
  .get(blogController.getById)
  .put(blogController.update)
  .delete(blogController.delete);

module.exports = router;
