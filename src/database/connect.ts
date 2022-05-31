import mysql from "mysql";

const config: mysql.ConnectionConfig = {
  host: process.env.BDD_HOST,
  user: process.env.BDD_USER,
  password: process.env.BDD_PASS,
};

const connection = mysql.createConnection(config);

connection.connect((err: any) => {
  console.log(err ? err.stack : "Connected!");
});

connection.end((err: any) => {
  console.log(err ? err.stack : "Disconnected!");
});
