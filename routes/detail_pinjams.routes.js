import express from "express";

import {
    getAlldetail_pinjams,
    tambahdetail_pinjambaru,
    caridetail_pinjamByID,
    updatedetail_pinjam,
    deletedetail_pinjam,
} from "../controllers/detail_pinjams.controllers.js";


 const router = express.Router();
 router.get("/", getAlldetail_pinjams);
 router.post("/", tambahdetail_pinjambaru);
 router.get("/:id", caridetail_pinjamByID);
 router.patch("/:id", updatedetail_pinjam);
 router.delete("/:id", deletedetail_pinjam);
 router.get("/buku",getAlldetail_pinjams);
export default router;