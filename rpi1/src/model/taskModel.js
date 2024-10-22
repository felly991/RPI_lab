import { tasks } from "../mock/task.js";

export default class TasksModel {
  #boardtasks = tasks;
  #observers = [];

  get tasks() {
    return this.#boardtasks;
  }

  addTask(task) {
    this.#boardtasks.push(task);
    this._notifyObservers();
  }

  removeTasksByStatus(status) {
    this.#boardtasks = this.#boardtasks.filter(
      (task) => task.status !== status
    );
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    for (const observer of this.#observers) {
      observer();
    }
  }
  
  updateTaskStatus(taskId, newStatus) {
    const id = Number(taskId);
    const taskIndex = this.#boardtasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.#boardtasks[taskIndex] = {
        ...this.#boardtasks[taskIndex],
        status: newStatus,
      };
      this._notifyObservers();
    }
  }
}