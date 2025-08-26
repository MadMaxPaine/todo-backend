module.exports = class UserDto {
  username;  
  id; 
  constructor(model) {
    this.id = model.id;
    this.username = model.username;   
  }
};
//DTO - для зареєстрованих користувачів