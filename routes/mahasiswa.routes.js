import express from "express";
import {
    getAllMahasiswa,
    tambahmahasiswabaru,
    cariMahasiswaByNIM,
    updateMahasiswa,
    deleteMahasiswa
} from "../controllers/mahasiswa.controllers.js";

const router = express.Router();

// GET semua mahasiswa
router.get("/", getAllMahasiswa);

// POST tambah mahasiswa
router.post("/", tambahmahasiswabaru);

// GET mahasiswa by NIM (Diubah dari :id menjadi :nim)
router.get("/:nim", cariMahasiswaByNIM);

// UPDATE mahasiswa (Diubah dari :id menjadi :nim)
router.patch("/:nim", updateMahasiswa);

// DELETE mahasiswa (Diubah dari :id menjadi :nim)
router.delete("/:nim", deleteMahasiswa);

export default router;