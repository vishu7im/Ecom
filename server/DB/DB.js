import mysql from "mysql";
import { promisify } from "util";

const mysql_creds = {
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "",
  database: "Eapp",
};

export const pool = mysql.createPool(mysql_creds);
export const promiseQuery = promisify(pool.query).bind(pool);
