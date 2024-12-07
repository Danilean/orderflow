import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

const dbDir = path.resolve(__dirname, "..", "db");
const dbPath = path.join(dbDir, "pedidos.db");

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const sqlite = sqlite3.verbose();

const db = new sqlite.Database(
  dbPath,
  sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
      console.log("Conexão com o banco de dados estabelecida.");
    }
  }
);

db.serialize(() => {
  db.run(
    `
        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            state TEXT,
            customer_name TEXT,
            customer_email TEXT
        )
        `,
    (err) => {
      if (err) {
        console.error("Erro ao criar a tabela 'orders':", err.message);
      } else {
        console.log("Tabela 'orders' criada ou já existe.");
      }
    }
  );
});

export default db;
