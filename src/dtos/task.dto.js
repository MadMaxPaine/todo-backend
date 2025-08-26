class TaskDto {
  constructor(task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.priority = task.priority;
    this.status = task.status;
    this.userId = task.userId;
    this.categoryId = task.categoryId;
    
  }
}

module.exports = TaskDto;