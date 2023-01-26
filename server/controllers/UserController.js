import { userService } from "../service/UserService.js";

class UserController {
  async registration(req, res) {
    try {
      const { name, email, password } = req.body;
      let pic;
      if (req.files) {
        pic = req.files.pic;
        const user = await userService.registrationUser(
          name,
          email,
          password,
          pic
        );
        res.cookie("refreshToken", user.refreshToken, {
          maxAge: 15 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.status(200).json(user);
      }
      const user = await userService.registrationUser(
        name,
        email,
        password,
        (pic = null)
      );
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.loginUser(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logoutUser(refreshToken);
      res.clearCookie("refreshToken");
      //   return res.redirect(301, "http://google.com");
      return res.json(token);
    } catch (e) {
      console.log(e);
    }
  }
}

export const userController = new UserController();
