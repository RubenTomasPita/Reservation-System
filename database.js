const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('reservas.db');

//Base de datos

db.run(`
  CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    personas INTEGER,
    fecha TEXT,
    hora TEXT
  )
`);

module.exports = db;
