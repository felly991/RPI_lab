import TaskListComponent from "../components/taskListComponent.js";
import TaskComponent from "../components/task.js";
import TaskAreaComponent from "../components/taskAreaComponent.js";
import { StatusArray } from "../consts.js";
import { render } from "../framework/render.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;

  #tasksBoardComponent = new TaskAreaComponent();

  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#renderBoard();
    this.#renderTask();
  }

  #renderBoard() {
    this.#boardTasks = [...this.#tasksModel.tasks];
    render(this.#tasksBoardComponent, this.#boardContainer);
    for (const status of StatusArray) {
      const tasksListComponent = new TaskListComponent(status);
      render(tasksListComponent, this.#tasksBoardComponent.getElement());

      const tasksForStatus = this.boardTasks.filter(
        (task) => task.status === status
      );

      const tasksListElement = tasksListComponent
        .getElement()
        .querySelector(".task-list-container");

      for (const task of tasksForStatus) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, tasksListElement);
      }
    }
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });

    render(taskComponent, container);
  }
}

