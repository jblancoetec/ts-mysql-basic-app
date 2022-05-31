import DBCompany from "../src/DBCompany";
import dotenv from "dotenv";

dotenv.config();
let database: DBCompany;

beforeEach(() => {
  database = new DBCompany();
});

afterEach(() => {
  database.destroy();
});

test("Deberian existir tres empleados", () => {
  const employees = database.getUsers();
  expect(employees.length).toBe(3);
});
