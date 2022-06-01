import DBCompany, { createDB, destroyDB } from "../src/DBCompany";
import dotenv from "dotenv";

dotenv.config();

beforeEach(() => {
  return createDB();
});

afterEach(() => {
  return destroyDB();
});

test("Deberian existir tres empleados", async () => {
  try {
    const db = new DBCompany();
    const employees = await db.getEmployees();
    expect(employees.length).toBe(3);
  } catch (error) {
    console.log(error);
  }
});
