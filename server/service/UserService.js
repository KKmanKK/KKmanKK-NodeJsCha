import { userModel } from "../models/models.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { UserDto } from "../Dtos/UserDto.js";
import { tokenService } from "./ToketService.js";
import path from "path"
import { fileURLToPath } from "url";
import fs from "fs"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
class UserService {
    async registrationUser(name, email, password, pic) {
        const candidat = await userModel.findOne({ where: { email } });
        if (candidat) {
            throw new Error("Пользователь уже существует")
        }
        const hashPass = bcrypt.hashSync(password, 4);

        if (pic) {

            let imgName = v4() + ".jpg";;
            pic.mv(path.resolve(__dirname, "..", "static", imgName));

            const user = await userModel.create({ name, email, password: hashPass, imgName })

            const userDto = new UserDto(user);
            const tokens = tokenService.generateToken({ ...userDto });
            await tokenService.saveToken(tokens.refreshToken, user.id);

            return {
                ...tokens,
                user: { ...userDto }
            }
        }

        const user = await userModel.create({ name, email, password: hashPass })

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(tokens.refreshToken, user.id);

        return {
            ...tokens,
            user: { ...userDto }
        }




    }
}

export const userService = new UserService();