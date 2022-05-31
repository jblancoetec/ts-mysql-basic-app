import dotenv from "dotenv";
dotenv.config();
console.log(process.env.BDD_PASS);
import "./database/connect";

console.log("Good looking in your hacking space!");

const HelloWorld: string = "Hello World";
export default HelloWorld;
