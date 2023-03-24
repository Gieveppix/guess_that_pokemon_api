const db = require("$/src/config/db");

module.exports = blogService = {
  getAll: async () => {
    const pokemon = await db("pokemon");
    return pokemon;
  },
  getById: async (id) => {
    const pokemon = await db("pokemon").where({ id });
    return pokemon[0];
  },
  getRandom: async (id) => {
    const uncaughtPokemon = async (id, count) => {
      let pokemon_id = null;
      let alreadyCaught = true;
      while (alreadyCaught) {
        let temp_pokemon_id = Math.floor(Math.random() * count[0].count + 1);
        await db("pokedex")
          .select("user_id", "pokemon_id")
          .where("user_id", "=", id)
          .andWhere("pokemon_id", "=", temp_pokemon_id)
          .then((data) => {
            if (data.length == 0) {
              alreadyCaught = false;
              pokemon_id = temp_pokemon_id;
            }
          });
      }
      return pokemon_id;
    };
    let count = await db("pokemon").count("id");
    let pokemon_id = uncaughtPokemon(id, count);

    return pokemon_id;
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
