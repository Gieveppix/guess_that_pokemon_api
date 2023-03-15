const express = require("express");

const app = express();

app.use(express.json());

const userRouter = require("./routes/user");
const pokemonRouter = require("./routes/pokemon");

app.use("/user", userRouter);
app.use("/pokemon", pokemonRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
