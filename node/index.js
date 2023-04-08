const express = require("express");

const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const mysql = require("mysql");
const connection = mysql.createConnection(config);

connection.query(
  `CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key(id));`
);
connection.query(`INSERT INTO people(name) values('Lucas');`);
connection.query(`INSERT INTO people(name) values('Francisco');`);
connection.query(`INSERT INTO people(name) values('João');`);
connection.end();

app.get("/", (_req, res) => {
  const connection = mysql.createConnection(config);

  connection.query("SELECT * FROM people", function (err, result, fields) {
    if (err) throw err;

    res.send(`
    <h1>Full Cycle Rocks!</h1>
    <h4>Desafio 02</h4>
    <p>- Lista de nomes cadastrados</p>
    <ul>
      ${result.map((pessoa) => `<li>${pessoa.name}</li>`).join("")}
    </ul>
    `);
  });
  connection.end();
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
