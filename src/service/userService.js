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
  create: async (createUser) => {
    const user = await db("user").insert(createUser);
    return user;
  },
  update: async (id, updateUser) => {
    const user = await db("user").where("id", id).update({
      email: updateUser.email,
      first_name: updateUser.first_name,
      last_name: updateUser.last_name,
      password: updateUser.password,
    });
    return user;
  },
  delete: async (id) => {
    const user = await db("user").where("id", id).del();
    return user;
  },
};
