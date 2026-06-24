import "dotenv/config";
import express from "express";
import db from "./config/db.config.js";
import bukus from "./routes/buku.routes.js"
import mahasiswas from "./routes/mahasiswa.routes.js"
import prodis from "./routes/prodi.routes.js"
import cors from "cors";
import pinjams from "./routes/pinjams.routes.js";
import detail_pinjam from "./routes/detail_pinjams.routes.js"; //semua import disini diambil dari routes
import User from "./routes/user.routes.js";
import {authenticateToken} from "./middleware/verifytokens.js";

const app=express();
try {
    await db.authenticate();
    console.log("database ok");
} catch (error) {
    console.log("belum konek",error);
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', User);
app.use(authenticateToken);
app.use('/api/buku',bukus);
app.use('/api/mahasiswa',mahasiswas);
app.use('/api/prodi', prodis);
app.use('/api/pinjam',pinjams);
app.use('/api/detail_pinjam',detail_pinjam); //warna biru tua tulisan disamakan dengan atas
app.use('/api/user', User);
app.listen(5000);