const User = require("../models/user.model");

class UserRepository {
  async findById(id) {
    return User.findOne({ where: { id } });
  }
  async findByUsername(username) {
    return User.findOne({ where: { username } });
  }
  async create(data) {
    return User.create(data);
  }
  // Можна додати update, delete, findAll тощо
}

module.exports = new UserRepository();