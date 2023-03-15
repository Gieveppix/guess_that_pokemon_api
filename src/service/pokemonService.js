const db = require("../config/db");

module.exports = blogService = {
  getAll: async () => {
    const pokemon = await db("pokemon");
    return pokemon;
  },
  getById: async (id) => {
    const pokemon = await db("pokemon").where({ id });
    return pokemon;
  },
  create: async (newPokemon) => {
    const pokemon = await db("pokemon").insert(newPokemon);
    return pokemon;
  },
  // delete: async (id) => {
  //   const pokemon = await db("pokemon").where("id", id).del();
  //   return pokemon;
  // },
};
