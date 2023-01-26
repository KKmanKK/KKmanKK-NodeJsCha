import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes/chatRouter.js";
import { sequelize } from "./db.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path"
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config();

const app = express();
app.use(express.json());
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname,"static")))
app.use(cors());
app.use(cookieParser())
const PORT = process.env.PORT || 5000;

app.use("/api", router);

const start = () => {
  try {
    sequelize.authenticate();
    sequelize.sync({ force: true });
    app.listen(PORT, () => {
      console.log("Сервер запущен");
    });
  } catch (e) {
    console.log(e);
  }
};
start();
