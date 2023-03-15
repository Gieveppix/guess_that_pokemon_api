const db = require("../config/db");

module.exports = userService = {
  getAll: async () => {
    const user = await db("user");
    return user;
  },
  getById: async (id) => {
    const user = await db("user").where("id", id);
    return user;
  },
  create: async (user) => {
    const user = await db("user").insert(user);
    return user;
  },
  update: async (id, user) => {
    const user = await db("user").where("id", id).update({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
    });
    return user;
  },
  delete: async (id) => {
    const user = await db("user").where("id", id).del();
    return user;
  },
};
