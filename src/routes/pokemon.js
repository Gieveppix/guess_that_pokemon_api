const express = require("express");
const router = express.Router();
const pokemonController = require("$/src/controller/pokemonController");

router.route("/getAll").get(pokemonController.getAll);
router.route("/:id").get(pokemonController.getById);
router.route("/getRandom/:id").get(pokemonController.getRandom);
router.route("/fill").post(pokemonController.fill);

module.exports = router;
