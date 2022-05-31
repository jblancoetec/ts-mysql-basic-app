import {
  ConnectionConfig,
  createConnection,
  createPool,
  Pool,
  PoolConfig,
  QueryOptions,
} from "mysql";

type Employee = {
  id: number;
  name: string;
  salary: number;
};

class MySQL {
  private readonly pool: Pool;
  constructor() {
    const config: ConnectionConfig = {
      host: process.env.BDD_HOST,
      user: process.env.BDD_USER,
      password: process.env.BDD_PASS,
    };
    const connection = createConnection(config);
    connection.connect();

    connection.query("CREATE DATABASE IF NOT EXISTS company;");
    connection.query("USE company;");
    connection.query(
      " CREATE TABLE employee ( id INT(11) NOT NULL AUTO_INCREMENT, name VARCHAR(45) DEFAULT NULL, salary INT(11) DEFAULT NULL, PRIMARY KEY(id)); "
    );
    connection.query(
      " INSERT INTO employee values (1, 'Ryan Ray', 20000), (2, 'Joe McMillan', 40000), (3, 'John Carter', 50000); "
    );

    connection.end();

    const configPool: PoolConfig = {
      ...config,
      database: "company",
    };

    this.pool = createPool(configPool);
  }

  getUsers(): Employee[] {
    const employees: Employee[] = [];
    this.pool.getConnection((err, connection) => {
      if (err) {
        return;
      }
      const sql = "SELECT * FROM employee;";
      connection.query(sql, (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row: any) => {
          employees.push({
            id: row.id,
            name: row.name,
            salary: row.salary,
          });
        });
        connection.release();
      });
    });

    return employees;
  }
}

export default MySQL;
