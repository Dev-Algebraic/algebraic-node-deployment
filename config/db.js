import mysql from 'mysql2/promise.js';
import config from '../config/Config.js';

async function query(sql, params) {
  const pool = await mysql.createPool(config.db);
  const [results, ] = await pool.query(sql, params);
  pool.end()
  return results;
}

export default query;