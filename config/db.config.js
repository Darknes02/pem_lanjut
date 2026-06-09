 import { DataTypes, Sequelize } from "sequelize";
 import mysql from "mysql2"
 const dbname = "web_lanjut";

 const DB_NAME = process.env.DB_NAME || dbname;
 const DB_USER = process.env.DB_USER || 'avnadmin';
 const DB_PASSWORD = process.env.DB_PASSWORD;
 const DB_HOST = process.env.DB_HOST;
 const DB_PORT = process.env.DB_PORT;

 const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
     host: DB_HOST,
     dialect: "mysql",
     port: DB_PORT,
     dialectModule: mysql,
     dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
     },
      "define": {
        "timestamps": false
      }
    });
export default db;

/*(async()=>{
await db.sync();
})();*/