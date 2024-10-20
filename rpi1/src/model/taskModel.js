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
}