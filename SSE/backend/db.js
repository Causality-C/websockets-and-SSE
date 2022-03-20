const pg = require("pg");
const Pool = pg.Pool
const types = pg.types;
require('dotenv').config()

const pool = new Pool({
    user: process.env.DBMS_USER,
    password: process.env.DBMS_PASS,
    database: process.env.DBMS_DATABASE,
    host: process.env.DBMS_HOST,
    port: process.env.DBMS_PORT
});

module.exports = pool;