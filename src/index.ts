import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MYSQLPASS);
import "./database/connect";

console.log("Good looking in your hacking space!");

const HelloWorld: string = "Hello World";
export default HelloWorld;
