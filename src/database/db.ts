import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db/pedidos.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados", err);
    } else {
        console.log("Conexão com o banco de dados estabelecida.");
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
                                              id TEXT PRIMARY KEY,
                                              state TEXT,
                                              customer_name TEXT,
                                              customer_email TEXT
        )
    `, (err) => {
        if (err) {
            console.error("Erro ao criar a tabela 'orders'", err);
        } else {
            console.log("Tabela 'orders' criada ou já existe.");
        }
    });
});

export default db;
