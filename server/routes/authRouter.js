import { Router } from "express";
import { userController } from "../controllers/UserController.js";

export const authRouter = Router();

authRouter.post("/registration", userController.registration);
authRouter.post("/login", userController.login);
authRouter.get("/logout", userController.logout);
