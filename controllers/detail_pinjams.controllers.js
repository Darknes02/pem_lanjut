import detail_pinjams from "../models/detail_pinjams.model.js";
import buku from "../models/buku.model.js";
import { Sequelize } from "sequelize";

export const getAlldetail_pinjams=async (req, res)=>{
  try {
    const data = await detail_pinjams.findAll({
         include: {model: buku},
    });
    res.json(data);
  }catch(error) {
    res.json({message:error.message});
  }
};

export const tambahdetail_pinjambaru=async (req, res)=>{
    try {
        const data= await detail_pinjams.create(req.body);
        res.json({"message":"Data Pinjam berhasil disimpan"});
    } catch (error) {
        res.json({message:error.message});
    }
};

export const caridetail_pinjamByID=async (req, res)=>{
    try {
        const data= await detail_pinjams.findAll({
            where:{ 
                id:req.params.id
            }
        });
        res.json(data[0]);
    } catch (error) {
        res.json({message:error.message});
    }
};

export const caridetail_pinjamByNIM=async (req, res)=>{
    try {
        const data= await detail_pinjams.findAll({
            where:{ 
                id:req.params.id
            }
        });
        res.json(data[0]);
    } catch (error) {
        res.json({message:error.message});
    }
};

export const updatedetail_pinjam = async (req, res) => {
    try {
        await detail_pinjams.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({ "message": "Data Detail Pinjam berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deletedetail_pinjam = async (req, res) => {
    try {
        await detail_pinjams.destroy({
            where: {
                nim: req.params.id
            }
        });
        res.json({ "message": "Data Detail Pinjam berhasil dihapus" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
