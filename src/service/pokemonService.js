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
  fill: async (req, res) => {
    console.time("mytimer");
    // the lenght should be 1008
    const length = 151;
    let i = 1;
    let tempPokemon = {
      name: "",
      pokemon_id: "",
      image: "",
    };
    let pokemon = [];
    url = "https://pokeapi.co/api/v2/pokemon";
    try {
      for (i; i <= length; i++) {
        let response = await fetch(`${url}/${i}`);
        let data = await response.json();

        tempPokemon = {
          name: data.name,
          pokemon_id: data.id,
          image: data.sprites.front_default,
        };
        pokemon.push(tempPokemon);
      }
      await db("pokemon").insert(pokemon);
      console.timeEnd("mytimer");
      res.status(200).json("ok");
    } catch (error) {
      console.log(error);
      res.status(400).json("");
    }
  },
  // delete: async (id) => {
  //   const pokemon = await db("pokemon").where("id", id).del();
  //   return pokemon;
  // },
};
