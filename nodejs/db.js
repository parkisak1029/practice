const mysql = require("mysql2/promise"); // object
require('dotenv').config()

const password = process.env.PASSWORD
const database = process.env.DATABASE

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: password,
  database: database,
});

async function select() {
  try{

    const sql = `SELECT * FROM user`
    const [result] = await pool.query(sql)
  } catch(e) {
    console.log('에러?')
  }
}

select()

module.exports = pool