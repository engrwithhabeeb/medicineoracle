const { Pool } = require("pg");

const connectionString = `postgres://${process.env.DB_USER}:${Number(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${Number(process.env.DB_PORT)}/${process.env.DB_NAME}`;

const pool = new Pool({
    connectionString
});

module.exports = pool;