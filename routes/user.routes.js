import express from "express";
import {
    tambahuser,login, getAllUser, deleteUser,
} from "../controllers/user.controllers.js";
import{ authenticateToken } from "../middleware/verifytokens.js";
const routerUser = express.Router();
routerUser.get("/", getAllUser);
routerUser.post("/",tambahuser);
routerUser.post("/login",login, authenticateToken);
routerUser.delete("/:id", deleteUser);
routerUser.get("/dashboard", authenticateToken, (req, res) => {
    res.send("Welcome to the dashboard");
});


export default routerUser;