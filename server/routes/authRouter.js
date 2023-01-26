import { Router } from "express";

export const authRouter = Router();

authRouter.post("/registraton");
authRouter.post("/login");
authRouter.get("/logout/:id");

