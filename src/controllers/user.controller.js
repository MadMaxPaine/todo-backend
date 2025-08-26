const { validationResult } = require("express-validator");
const UserService = require("../services/user.service");
const ApiError = require("../utils/errors.API");
class UserController {
 async getOne(req, res, next) {
  try {
   const { id } = req.params;
   const userDto = await UserService.getOne(id);
   return res.json({ ...userDto });
  } catch (e) {
   return next(e);
  }
 }

 async registration(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest("Validation error", errors.array()));
    }

    const { username, password } = req.body;
    const existingUser = await UserService.getOneUsername(username);

    if (existingUser) {
     console.log(req.body);     
      return UserController.prototype.login.call(this, req, res, next);
    }

    const registrationData = { username, password };
    const result = await UserService.registration(registrationData);
    const { token, userDto } = result;

    res.cookie("refreshToken", token.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json({ ...token, userDto });
  } catch (e) {
    return next(e);
  }
}

 async login(req, res, next) {
  try {
   const { username, password } = req.body;
   const { token, userDto } = await UserService.login(username, password);
   res.cookie("refreshToken", token.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
   });
   return res.json({ ...token, userDto });
  } catch (e) {
   return next(e);
  }
 }

 async logout(req, res, next) {
  try {
   const { refreshToken } = req.cookies;
   const token = await UserService.logout(refreshToken);
   res.clearCookie("refreshToken");
   return res.json({ token });
  } catch (e) {
   return next(e);
  }
 }

 async refresh(req, res, next) {
  try {
   const { refreshToken } = req.cookies;
   if (!refreshToken) {
    return next(ApiError.unauthorizedError());
   }
   const { token, userDto } = await UserService.refresh(refreshToken);
   res.cookie("refreshToken", token.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
   });

   return res.json({ ...token, userDto });
  } catch (e) {
   return next(e);
  }
 }
}

module.exports = new UserController();
