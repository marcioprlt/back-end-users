import express from "express";
import UserController from "../controllers/usersController.js";

const router = express.Router();

router
    .get("/api/v1/users", UserController.listUsers)
    .post("/api/v1/users", UserController.createUser)

export default router;