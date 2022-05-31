import MySQL from "../src/MySQL";
import dotenv from "dotenv";

dotenv.config();

test("Deberian existir tres usuarios", () => {
  const database = new MySQL();
  const users = database.getUsers();
  expect(users.length).toBe(3);
});
