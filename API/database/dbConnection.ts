import sqlite3 from "sqlite3";
import path from "path";

let dbInstance: sqlite3.Database | null = null;

export function createDbConnection(): sqlite3.Database {
  if (dbInstance) {
    return dbInstance;
  }

  const filepath = path.resolve(__dirname, "../database/toDo.db");

  const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      console.error("Erro ao conectar com o banco de dados:", error.message);
      throw error;
    }
    console.log("Conexão com o SQLite foi estabelecida.");

    db.exec(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        completed BOOLEAN
      )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar a tabela:", err.message);
          throw err;
        }
        console.log("Tabela 'todos' pronta para uso.");
      }
    );
  });

  dbInstance = db;
  return db;
}