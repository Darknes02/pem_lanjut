import express from "express";
import {
    getAllProdi,
    tambahprodisbaru,
    cariProdiByID,
    updateProdi,
    deleteProdi
} from "../controllers/prodi.controllers.js";
import {authenticateToken} from "../middleware/verifytokens.js";

const router = express.Router();

// GET semua prodi
router.get("/", getAllProdi);
// POST tambah prodi
router.post("/",authenticateToken, tambahprodisbaru );
// GET prodi by ID
router.get("/:kode_prodi", cariProdiByID);
// UPDATE prodi
router.patch("/:id", updateProdi);
// DELETE prodi
router.delete("/:id", deleteProdi);
export default router;