require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const {
  sessionKnex,
  sessionRedis,
  sessionSync,
} = require("$/src/middleware/session");
app.use(sessionRedis, sessionKnex);

// Testing sessions =>
app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views += 1;
  }
  next();
});
app.get("/", sessionSync, (req, res, next) => {
  res.send(`Hello, you've viewed this page ${req.session.views} times.`);
});
// => Testing sessions

const userRouter = require("$/src/routes/user");
const pokemonRouter = require("$/src/routes/pokemon");
const pokedexRouter = require("$/src/routes/pokedex");
app.use("/user", sessionSync, userRouter);
app.use("/pokemon", sessionSync, pokemonRouter);
app.use("/pokedex", sessionSync, pokedexRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
