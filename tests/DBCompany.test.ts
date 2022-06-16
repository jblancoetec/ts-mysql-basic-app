import DBCompany from "../src/DBCompany";
import { createDB, destroyDB } from "../database/database";
import dotenv from "dotenv";

dotenv.config();

const db = new DBCompany();

beforeAll(() => {
  return createDB();
});

afterAll(() => {
  return destroyDB();
});

test("Deberian existir tres empleados en la base de datos", async () => {
  const employees = await db.getEmployees();
  expect(employees.length).toBe(3);
});

test("Deberia existir un empleado con sueldo igual a 50000", async () => {
  const employees = await db.getEmployees();
  const employee = employees.find((employee) => employee.salary === 50000);
  expect(employee).toBeDefined();
});

test("Deberia existir un empleado llamado Ryan Ray", async () => {
  const employees = await db.getEmployees();
  const employee = employees.find((employee) => employee.name === "Ryan Ray");
  expect(employee).toBeDefined();
});
