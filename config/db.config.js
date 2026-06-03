 import { DataTypes, Sequelize } from "sequelize";
 import mysql from "mysql2"
 const db = new Sequelize('bukumahapro', 'root', '', {
     host: "localhost",
     dialect: "mysql",
     dialectModule: mysql,
      "define": {
        "timestamps": false
      }
    });
export default db;

(async()=>{
await db.sync();
})();