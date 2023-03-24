const session = require("express-session");

const db = require("$/src/config/db");
const KnexSessionStore = require("connect-session-knex")(session);

const redisClient = require("$/src/config/redis");
const RedisStore = require("connect-redis").default;

const { v4: uuidv4 } = require("uuid");

const knexStore = new KnexSessionStore({
  knex: db,
  tablename: "session",
  // clearInterval -> defaults to 60 * 1000
  disableDbCleanup: true,
});

let redisStore = new RedisStore({
  client: redisClient,
});

const sessionSync = (req, res, next) => {
  if (req.session) {
    if (req.sessionStore instanceof KnexSessionStore) {
      redisStore.set(req.sessionID, req.session, () => {});
    } else if (req.sessionStore instanceof RedisStore) {
      knexStore.set(req.sessionID, req.session, () => {});
    }
  }
  next();
};

const sessionRedis = session({
  store: redisStore,
  genid: function (req) {
    return uuidv4(); // use UUIDs for session IDs
  },
  secret: "pass",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 120 * 1000 },
});

const sessionKnex = session({
  store: knexStore,
  genid: function (req) {
    return uuidv4(); // use UUIDs for session IDs
  },
  secret: "pass",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 120 * 1000 },
});

module.exports = { sessionKnex, sessionRedis, sessionSync };
