const Token = require("../models/token.model");

class TokenRepository {
 async findByUserId(userId) {
  return Token.findOne({ where: { userId } });
 }
 async findByRefreshToken(refreshToken) {
  return Token.findOne({ where: { refreshToken: refreshToken.trim() } });
 }
 async create(data) {
  return Token.create(data);
 }
 async update(tokenInstance, refreshToken) {
  tokenInstance.refreshToken = refreshToken;
  return tokenInstance.save();
 }
 async deleteByRefreshToken(refreshToken) {
  return Token.destroy({ where: { refreshToken: refreshToken.trim() } });
 }
}

module.exports = new TokenRepository();