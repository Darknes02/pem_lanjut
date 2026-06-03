import express from "express";
import {
    getAllPinjam,
    tambahPinjambaru,
    cariPinjamByID,
    updatePinjam,
    deletePinjam,
    cariPinjamByNIM,
    returnOneBook,
    returnAllBooks,
    pengembalianBuku,
    insertPinjam,
    cariBukuDipinjam,
    laporanPengembalian
} from "../controllers/pinjams.controllers.js";
import {authenticateToken} from "../middleware/verifytokens.js";

const router = express.Router();
router.get("/", getAllPinjam); //minta data
// router.post("/", tambahPinjambaru); //post itu untuk megnirim data
router.post("/", insertPinjam);
router.post("/pengembalian", authenticateToken, pengembalianBuku);
router.get("/laporanPengembalian",authenticateToken, laporanPengembalian);
router.get("/dipinjam/:nim", cariBukuDipinjam);
router.put("/return/all/:pinjam_id", returnAllBooks); // untuk mengembalikan semua
router.get("/nim/:id", cariPinjamByNIM);
router.get("/:id", cariPinjamByID); 
router.patch("/:id", updatePinjam); //buat mengubah data
router.delete("/:id", deletePinjam); 
router.put("/:pinjam_id/detail/:detail_id/return", returnOneBook); //pinjam_id dan detail_id ambiln 1, fungsi put untuik mengubah data
//const routes itu disesuaikan dengan yang di pinjam congtroller, disamakan

export default router; 