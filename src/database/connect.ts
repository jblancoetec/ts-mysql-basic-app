import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQLPASS || "",
  insecureAuth: true,
});

connection.connect((err: any) => {
  console.log(err ? err.stack : "Connected!");
});

connection.end((err: any) => {
  console.log(err ? err.stack : "Disconnected!");
});
