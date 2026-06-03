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

// GET mahasiswa by NIM
router.get("/:id", cariMahasiswaByNIM);

// UPDATE mahasiswa
router.patch("/:id", updateMahasiswa);

// DELETE mahasiswa
router.delete("/:id", deleteMahasiswa);

export default router;