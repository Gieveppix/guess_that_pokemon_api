const userService = require("../service/userService");
module.exports = userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const user = await userService.getAllUsers();
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.params.id);
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
