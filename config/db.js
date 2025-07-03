const mysql = require('mysql2/promise');
const config = require('../config/Config');

async function query(sql, params) {
  const pool = await mysql.createPool(config.db);
  const [results, ] = await pool.query(sql, params);
  pool.end()
  return results;
}

module.exports = {
  query
}