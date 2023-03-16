const db = require("../config/db");

module.exports = pokedexService = {
  getAll: async () => {
    const pokedex = await db("pokedex");
    return pokedex;
  },
  getById: async (id) => {
    const pokedex = await db("pokedex").where("id", id);
    return pokedex;
  },
  create: async (req, res) => {
    await db("pokedex")
      .select("user_id", "pokemon_id")
      .where("user_id", "=", req.body.user_id)
      .andWhere("pokemon_id", "=", req.body.pokemon_id)
      .first()
      .then(async (data) => {
        if (!data) {
          await db("pokedex")
            .insert(req.body)
            .then((data) => {
              res.status(200).json("ok");
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json("Server error");
            });
        } else {
          res.status(400).json("Pokemon already in pokedex");
        }
      });
  },
};
