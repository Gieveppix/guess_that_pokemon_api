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
  create: async (newPokedex) => {
    const pokedex = await db("pokedex").insert(newPokedex);
    return pokedex;
  },
  delete: async (id) => {
    const pokedex = await db("pokedex").where("id", id).del();
    return pokedex;
  },
};
