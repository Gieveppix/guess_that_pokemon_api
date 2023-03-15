const express = require("express");

const app = express();

app.use(express.json());

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
