import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import Mahasiswas from "./mahasiswa.model.js";
import Buku from "./buku.model.js";
import pinjams from "./pinjams.model.js";

const { DataTypes } = Sequelize;
const detail_pinjams = db.define("detail_pinjams", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pinjam_id: {
        type: DataTypes.INTEGER,
    },
    buku_id: {
        type: DataTypes.INTEGER,
    },
    jml_pinjam: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.INTEGER,
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
},{
    freezeTableName: true, 
});


export default detail_pinjams; //penulisan pinjams ii sama kaya yang define pinjam

// User sama Komentar
// User hasMany Komentar 
// Komentar belongsTo User