 import { DataTypes, Sequelize } from "sequelize";
 
 const db = new Sequelize('bukumahapro', 'root', '', {
     host: "localhost",
     dialect: "mysql",
      "define": {
        "timestamps": false
      }
    });
export default db;

(async()=>{
await db.sync();
})();