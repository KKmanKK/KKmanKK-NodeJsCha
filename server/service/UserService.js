import { userModel } from "../models/models.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { UserDto } from "../Dtos/UserDto.js";
import { tokenService } from "./ToketService.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserService {
  async registrationUser(name, email, password, pic) {
    const candidat = await userModel.findOne({ where: { email } });
    if (candidat) {
      throw new Error("Пользователь уже существует");
    }
    const hashPass = bcrypt.hashSync(password, 4);

    if (pic) {
      let imgName = v4() + ".jpg";
      pic.mv(path.resolve(__dirname, "..", "static", imgName));

      const user = await userModel.create({
        name,
        email,
        password: hashPass,
        imgName,
      });

      const userDto = new UserDto(user);
      const tokens = tokenService.generateToken({ ...userDto });
      await tokenService.saveToken(tokens.refreshToken, user.id);

      return {
        ...tokens,
        user: { ...userDto },
      };
    }

    const user = await userModel.create({ name, email, password: hashPass });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(tokens.refreshToken, user.id);

    return {
      ...tokens,
      user: { ...userDto },
    };
  }

  async loginUser(email, password) {
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      throw new Error("Неверный логин");
    }
    const isPass = bcrypt.compareSync(password, user.password);
    if (!isPass) {
      throw new Error("Неверный пароль");
    }
    const userDTO = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDTO });
    await tokenService.saveToken(tokens.refreshToken, userDTO.id);

    return {
      ...tokens,
      user: { ...userDTO },
    };
  }
  async logoutUser(refreshToken) {
    const tokenData = await tokenService.removeToken(refreshToken);
    return tokenData;
  }
}

export const userService = new UserService();
