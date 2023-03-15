const pokedexService = require("../service/pokedexService");
module.exports = pokedexController = {
  getAll: async (req, res, next) => {
    try {
      const pokedex = await pokedexService.getAll();
      res.json(pokedex);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const pokedex = await pokedexService.getById(req.params.id);
      res.json(pokedex);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const pokedex = await pokedexService.create(req.body);
      res.json(pokedex);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const pokedex = await pokedexService.delete(req.params.id);
      res.json(pokedex);
    } catch (error) {
      next(error);
    }
  },
};
