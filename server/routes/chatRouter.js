import { Router } from "express";
import { userController } from "../controllers/UserController.js";
import { chats } from "../data.js";
import { userModel } from "../models/models.js";

export const router = Router();

router.get("/chat", async (req, res) => {
  res.json(chats);
});
