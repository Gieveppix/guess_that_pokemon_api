const db = require("../config/db");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

module.exports = userService = {
  getAll: async () => {
    const user = await db("user");
    return user;
  },
  getById: async (id) => {
    const user = await db("user").where("id", id);
    return user;
  },
  register: async (req, res) => {
    const saltRounds = 10;

    const { email, first_name, last_name, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("422");
      return res.status(422).jsonp(errors.array());
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      await db("user")
        .insert({
          email,
          first_name,
          last_name,
          password: hash,
        })
        .then((result) => {
          if (result.severity == "ERROR") {
            return;
          } else {
            res.status(200).json("Register ok");
          }
        })
        .catch((error) => {
          if (error.constraint == "user_email_unique") {
            return res.status(409).json("Email already exists");
          }
          console.log(error);
          res.status(400).json("Unable to register");
        });
    }
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
