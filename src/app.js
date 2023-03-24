require("dotenv").config();
const express = require("express");
const session = require("express-session");

const db = require("./config/db");
const KnexSessionStore = require("connect-session-knex")(session);

const { createClient } = require("redis");
const RedisStore = require("connect-redis").default;

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

// const SessionStore = KnexSessionStore(session);

const knexStore = new KnexSessionStore({
  knex: db,
  tablename: "session",
  // clearInterval -> defaults to 60 * 1000
  disableDbCleanup: true,
});

const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.on("error", (err) => {
  console.error("Could not connect to Redis:", err);
});

redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
});

const sessionSyncMiddleware = (req, res, next) => {
  if (req.session) {
    if (req.sessionStore instanceof KnexSessionStore) {
      redisStore.set(req.sessionID, req.session, () => {
      });
    } else if (req.sessionStore instanceof RedisStore) {
      knexStore.set(req.sessionID, req.session, () => {
      });
    }
  }
  next();
};

app.use(
  session({
    store: redisStore,
    genid: function (req) {
      return uuidv4(); // use UUIDs for session IDs
    },
    secret: "pass",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 120 * 1000 },
  })
);
app.use(
  session({
    store: knexStore,
    genid: function (req) {
      return uuidv4(); // use UUIDs for session IDs
    },
    secret: "pass",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 120 * 1000 },
  })
);

app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views += 1;
  }
  next();
});

app.get("/", sessionSyncMiddleware, (req, res, next) => {
  res.send(`Hello, you've viewed this page ${req.session.views} times.`);
  sessionSyncMiddleware(req, res, next);
});

const userRouter = require("$/src/routes/user");
const pokemonRouter = require("$/src/routes/pokemon");
const pokedexRouter = require("$/src/routes/pokedex");

app.use("/user", sessionSyncMiddleware, userRouter);
app.use("/pokemon", sessionSyncMiddleware, pokemonRouter);
app.use("/pokedex", sessionSyncMiddleware, pokedexRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
