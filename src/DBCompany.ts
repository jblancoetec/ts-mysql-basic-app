import { createConnection, ConnectionOptions } from "mysql2/promise";

import { createPool, Pool, PoolOptions } from "mysql2";

export type Employee = {
  id: number;
  name: string;
  salary: number;
};

const config: ConnectionOptions = {
  host: process.env.BDD_HOST || "localhost",
  user: process.env.BDD_USER || "root",
  password: process.env.BDD_PASS || "newpass",
};

export const createDB = async () => {
  try {
    const connection = await createConnection(config);
    connection.query(" CREATE DATABASE IF NOT EXISTS company; ");
    connection.query(" USE company; ");
    connection.query(
      " CREATE TABLE employee ( id INT(11) NOT NULL AUTO_INCREMENT, name VARCHAR(45) DEFAULT NULL, salary INT(11) DEFAULT NULL, PRIMARY KEY(id));"
    );
    connection.query(
      " INSERT INTO employee values (1, 'Ryan Ray', 20000), (2, 'Joe McMillan', 40000), (3, 'John Carter', 50000); "
    );
    connection.end();
  } catch (error) {
    console.log(error);
  }
};

export const destroyDB = async () => {
  try {
    const connection = await createConnection(config);
    connection.query(" DROP DATABASE IF EXISTS company; ");
    connection.end();
  } catch (error) {
    console.log(error);
  }
};

class DBCompany {
  private readonly pool;

  constructor() {
    const configPool: PoolOptions = {
      host: process.env.BDD_HOST,
      user: process.env.BDD_USER,
      password: process.env.BDD_PASS,
      database: "company",
    };
    const pool = createPool(configPool);
    this.pool = pool.promise();
  }

  async getEmployees(): Promise<Employee[]> {
    const [rows, fields] = await this.pool.query("SELECT * FROM employee");
    const employees = JSON.parse(JSON.stringify(rows));
    return employees;
  }
}

export default DBCompany;
