import express from "express";
import {
    getAllProdi,
    tambahprodisbaru,
    cariProdiByID,
    updateProdi,
    deleteProdi
} from "../controllers/prodi.controllers.js";

const router = express.Router();

// GET semua prodi
router.get("/", getAllProdi);

// POST tambah prodi
router.post("/", tambahprodisbaru);

// GET prodi by ID
router.get("/:id", cariProdiByID);

// UPDATE prodi
router.patch("/:id", updateProdi);

// DELETE prodi
router.delete("/:id", deleteProdi);

export default router;