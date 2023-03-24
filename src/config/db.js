const Knex = require("knex");

const config = require("$/src/config/knexfile");

const knex = Knex(config.development);

module.exports = knex;
