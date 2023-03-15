const express = require("express");
const router = express.Router();
const pokedexController = require("../controller/pokedexController");

router.route("/").get(pokedexController.getAll).post(pokedexController.create);
router
  .route("/:id")
  .get(pokedexController.getById)
  .delete(pokedexController.delete);

module.exports = router;
