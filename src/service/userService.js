const db = require("../config/db");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

module.exports = userService = {
  getAll: async () => {
    return await db("user").orderBy("id");
  },
  getById: async (id) => {
    return await db("user").where("id", id);
  },
  register: async (req, res) => {
    const saltRounds = 10;

    const { email, first_name, last_name, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
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
        .then((data) => {
          if (data.severity == "ERROR") {
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
  login: async (req, res) => {
    await db("user")
      .select("email", "password")
      .where("email", "=", req.body.email)
      .then(async (data) => {
        const isValid = await bcrypt.compare(
          req.body.password,
          data[0].password
        );

        if (isValid) {
          return db("user")
            .select("email", "first_name", "last_name")
            .where("email", "=", req.body.email)
            .then((user) => {
              res.status(200).json(user[0]);
            })
            .catch((error) => {
              res.status(400).json("Unable to login");
            });
        } else {
          console.log("2");
          res.status(400).json("Wrong email or password");
        }
      })
      .catch((error) => {
        res.status(500).json("Server error");
      });
  },
  update: async (req, res) => {
    await db("user")
      .where("id", req.params.id)
      .update({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
      })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        if (error.constraint == "user_email_unique") {
          res.status(209).json("Email already exists");
        } else {
          res.status(400).json("Failed to update user");
        }
      });
  },
  delete: async (id) => {
    const user = await db("user").where("id", id).del();
    return user;
  },
};
