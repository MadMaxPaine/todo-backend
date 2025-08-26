const TokenService = require("./token.service"); // Імпортуємо TokenService класс
const UserRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const ApiError = require("../utils/errors.API");
const UserDto = require("../dtos/user.dto");


class UserService {
 // Отримання користувача по ID
 async getOne(id) {
  try {
   const user = await UserRepository.findById(id);
   if (!user) {
    throw ApiError.internal("User not found!");
   }
   return new UserDto(user);
  } catch (e) {
   throw e;
  }
 }
 async getOneUsername(username) {
  try {
   const user = await UserRepository.findByUsername(username);
   if (!user) {
    return null;
   }
   return new UserDto(user);
  } catch (e) {
   throw e;
  }
 }

 // Реєстрація користувача
 async registration(data) {
  try {
   const {
    username,
    password,
   } = data;
   const candidate = await UserRepository.findByUsername(username);
   if (candidate) {
    throw ApiError.badRequest("User with current username exists!");
   }
   const hashPassword = await bcrypt.hash(password, 5);

   const user = await UserRepository.create({
    username,
    password: hashPassword,
   });

   const userDto = new UserDto(user);
   const token = TokenService.generateTokens({ ...userDto });
   await TokenService.saveToken(userDto.id, token.refreshToken);
   return { token, userDto };
  } catch (e) {
   throw e;
  }
 }

 // Логін користувача
 async login(username, password) {
  try {
   const user = await UserRepository.findByUsername(username);
   if (!user) {
    throw ApiError.internal("User not found!");
   }

   const comparePassword = bcrypt.compareSync(password, user.password);
   if (!comparePassword) {
    throw ApiError.internal("Wrong password");
   }

   const userDto = new UserDto(user);
   const token = TokenService.generateTokens({ ...userDto });
   await TokenService.saveToken(userDto.id, token.refreshToken);

   return { token, userDto };
  } catch (e) {
   throw e;
  }
 }

 // Вихід з системи
 async logout(refreshToken) {
  try {
   const token = await TokenService.removeToken(refreshToken);
   return token;
  } catch (e) {
   throw e;
  }
 }

 // Оновлення токену
 async refresh(refreshToken) {
  try {
   const userData = TokenService.validateRefreshToken(refreshToken);
   const tokenFromDb = await TokenService.findToken(refreshToken);

   if (!userData || !tokenFromDb) {
    throw ApiError.unauthorizedError();
   }

   const user = await UserRepository.findById(userData.id);
   const userDto = new UserDto(user);
   const token = TokenService.generateTokens({ ...userDto });

   await TokenService.saveToken(userDto.id, token.refreshToken);
   return { token, userDto };
  } catch (e) {
   throw e;
  }
 }

}

module.exports = new UserService();
