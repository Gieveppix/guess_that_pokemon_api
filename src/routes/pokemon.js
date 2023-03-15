const express = require("express");
const router = express.Router();
const pokemonController = require("../controller/pokemonController");

router.route("/").get(pokemonController.getAll).post(pokemonController.create);
router.route("/:id").get(pokemonController.getById);
// .delete(pokemonController.delete);

module.exports = router;
