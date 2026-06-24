import express from "express";
import {
    tambahuser,login, getAllUser,
} from "../controllers/user.controllers.js";
import{ authenticateToken } from "../middleware/verifytokens.js";
const routerUser = express.Router();
routerUser.post("/",tambahuser);
routerUser.post("/login",login, authenticateToken);
routerUser.get("/dashboard", authenticateToken, (req, res) => {
    res.send("Welcome to the dashboard");
});

router.get("/", getAllUser);
export default routerUser;