import { createPool, PoolOptions } from "mysql2/promise";

export const createDB = async () => {
  const config: PoolOptions = {
    host: process.env.HOSTDB || "localhost",
    user: process.env.USERDB || "root",
    password: process.env.PASSDB || "newpass",
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
    console.log("Error al crear base de datos");
  } finally {
    await pool.end();
  }
};

export const destroyDB = async () => {
  const config: PoolOptions = {
    host: process.env.HOSTDB || "localhost",
    user: process.env.USERDB || "root",
    password: process.env.PASSDB || "newpass",
  };
  const pool = createPool(config);
  try {
    await pool.query(" drop database if exists company; ");
  } catch (error) {
    console.log("Error al eliminar base de datos");
  } finally {
    await pool.end();
  }
};
