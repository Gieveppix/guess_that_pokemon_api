const pokemonService = require("../service/pokemonService");
module.exports = userController = {
  getAll: async (req, res, next) => {
    try {
      const pokemon = await pokemonService.getAll();
      res.json(pokemon);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const pokemon = await pokemonService.getById(req.params.id);
      res.json(pokemon);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const pokemon = await pokemonService.create(req.body);
      res.json(pokemon);
    } catch (error) {
      next(error);
    }
  },
  // delete: async (req, res, next) => {
  //   try {
  //     const pokemon = await pokemonService.delete(req.params.id);
  //     res.json(pokemon);
  //   } catch (error) {
  //     next(error);
  //   }
  // },
};
