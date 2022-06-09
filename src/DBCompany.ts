import { createPool, PoolOptions } from "mysql2/promise";

export type Employee = {
  id: number;
  name: string;
  salary: number;
};

class DBCompany {
  private readonly config: PoolOptions;
  constructor() {
    this.config = {
      host: process.env.BDD_HOST,
      user: process.env.BDD_USER,
      password: process.env.BDD_PASS,
      database: "company",
    };
  }

  private async queryDB(query: string) {
    const pool = createPool(this.config);
    try {
      const [rows] = await pool.query(query);
      const result = await JSON.parse(JSON.stringify(rows));
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      await pool.end();
    }
  }

  async getEmployees(): Promise<Employee[]> {
    const employees: Employee[] = await this.queryDB("SELECT * FROM employee");
    return employees;
  }
}

export const createDB = async () => {
  const config: PoolOptions = {
    host: process.env.BDD_HOST || "localhost",
    user: process.env.BDD_USER || "root",
    password: process.env.BDD_PASS || "newpass",
  };
  const pool = createPool(config);
  try {
    await pool.query(" create database if not exists company; ");
    await pool.query(" use company; ");
    await pool.query(
      " create table employee ( id int(11) not null auto_increment, name varchar(45) default null, salary int(11) default null, primary key(id));"
    );
    await pool.query(
      " insert into employee values (1, 'Ryan Ray', 20000), (2, 'Joe Mcmillan', 40000), (3, 'John Carter', 50000); "
    );
  } catch (error) {
    console.log(error);
  } finally {
    await pool.end();
  }
};

export const destroyDB = async () => {
  const config: PoolOptions = {
    host: process.env.BDD_HOST || "localhost",
    user: process.env.BDD_USER || "root",
    password: process.env.BDD_PASS || "newpass",
  };
  const pool = createPool(config);
  try {
    await pool.query(" drop database if exists company; ");
  } catch (error) {
    console.log(error);
  } finally {
    await pool.end();
  }
};

export default DBCompany;
