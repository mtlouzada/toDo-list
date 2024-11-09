const sqlite3 = require("sqlite3");
const path = require("path");

let dbInstance = null;

function createDbConnection() {
  if (dbInstance) {
    return dbInstance;
  }

  const filepath = path.resolve(__dirname, "../database/toDo.db");

  const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      return console.error(error.message);
    }
    console.log("Connection with SQLite has been established");

    db.exec(`CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      completed BOOLEAN
    )`, (err) => {
      if (err) {
        return console.error("Erro ao criar tabela:", err.message);
      }
      console.log("Tabela 'todos' pronta para uso.");
    });
  });

  dbInstance = db;
  return db;
}

module.exports = createDbConnection;
