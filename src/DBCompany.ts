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
      host: process.env.HOSTDB,
      user: process.env.USERDB,
      password: process.env.PASSDB,
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
      console.log("Error al ejecutar query: ", query);
    } finally {
      await pool.end();
    }
  }

  async getEmployees(): Promise<Employee[]> {
    const employees: Employee[] = await this.queryDB("SELECT * FROM employee");
    return employees;
  }
}

export default DBCompany;
