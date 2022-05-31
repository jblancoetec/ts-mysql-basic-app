import DBCompany, { createDB, destroyDB } from "../src/DBCompany";
import dotenv from "dotenv";

dotenv.config();

beforeEach(() => {
  createDB();
});

afterEach(() => {
  destroyDB();
});

test("Deberian existir tres empleados", async () => {
  const db = new DBCompany();
  const employees = await db.getEmployees();
  expect(employees.length).toBe(3);
});
