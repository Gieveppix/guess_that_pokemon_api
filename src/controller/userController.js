const userService = require("$/src/service/userService");
module.exports = userController = {
  getAll: async (req, res, next) => {
    try {
      const user = await userService.getAll();
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const user = await userService.getById(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      await userService.register(req, res);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      await userService.login(req, res);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      await userService.update(req, res);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const user = await userService.delete(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};
