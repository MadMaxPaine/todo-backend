class CategoryDto {
  constructor(category) {
    this.id = category.id;
    this.name = category.name;
    this.isDefault = category.isDefault;
    this.userId = category.userId;    
  }
}

module.exports = CategoryDto;