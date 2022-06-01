import {
  createConnection,
  ConnectionOptions,
  createPool,
  PoolOptions,
  Pool,
} from "mysql2/promise";

export type Employee = {
  id: number;
  name: string;
  salary: number;
};

export const createDB = async () => {
  const config: ConnectionOptions = {
    host: process.env.BDD_HOST || "localhost",
    user: process.env.BDD_USER || "root",
    password: process.env.BDD_PASS || "newpass",
  };
  const connection = await createConnection(config);
  connection.query(" CREATE DATABASE IF NOT EXISTS company; ");
  connection.query(" USE company; ");
  connection.query(
    " CREATE TABLE employee ( id INT(11) NOT NULL AUTO_INCREMENT, name VARCHAR(45) DEFAULT NULL, salary INT(11) DEFAULT NULL, PRIMARY KEY(id));"
  );
  connection.query(
    " INSERT INTO employee values (1, 'Ryan Ray', 20000), (2, 'Joe McMillan', 40000), (3, 'John Carter', 50000); "
  );
  await connection.end();
};

export const destroyDB = async () => {
  const config: ConnectionOptions = {
    host: process.env.BDD_HOST || "localhost",
    user: process.env.BDD_USER || "root",
    password: process.env.BDD_PASS || "newpass",
  };
  const connection = await createConnection(config);
  connection.query(" DROP DATABASE IF EXISTS company; ");
  await connection.end();
};

class DBCompany {
  private readonly pool: Pool;

  constructor() {
    const configPool: PoolOptions = {
      host: process.env.BDD_HOST,
      user: process.env.BDD_USER,
      password: process.env.BDD_PASS,
      database: "company",
    };
    this.pool = createPool(configPool);
  }

  destructor() {
    this.pool.end();
  }

  async getEmployees(): Promise<Employee[]> {
    const [rows] = await this.pool.query("SELECT * FROM employee;");
    const employees = await JSON.parse(JSON.stringify(rows));
    return employees;
  }
}

export default DBCompany;
