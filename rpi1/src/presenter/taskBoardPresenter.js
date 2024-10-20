import TaskListComponent from "../components/taskListComponent.js";
import TaskAreaComponent from "../components/taskAreaComponent.js";
import { StatusArray, Status } from "../consts.js";
import { render } from "../framework/render.js";
import TaskPresenter from "./taskPresenter.js";
import ClearButtonComponent from "../components/clearButtonComponent.js"
import TaskComponent from "../components/taskComponent.js"

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #taskPresenter = null;

  #tasksBoardComponent = new TaskAreaComponent();
  #clearButtonComponent = null;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#taskPresenter = new TaskPresenter({ tasksModel: this.#tasksModel });

    this.#tasksModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
    this.#renderTaskList();
    this.#renderBasket();
  }

  addNewTask(taskTitle) {
    this.#taskPresenter.addNewTask(taskTitle);
  }

  #handleModelEvent = () => {
    this.#clearBoard();
    this.#renderTaskList();
    this.#renderBasket();
  };

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = "";
    this.#clearButtonComponent = null;
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
  }

  #renderTaskList() {
    const nonBasketStatuses = StatusArray.filter(
      (status) => status !== Status.BASKET
    );
    for (const status of nonBasketStatuses) {
      const tasksListComponent = new TaskListComponent(status);
      tasksListComponent.element.setAttribute("data-status", status);
      render(tasksListComponent, this.#tasksBoardComponent.element);

      const tasksForStatus = this.#taskPresenter.getTasksByStatus(status);

      const tasksListElement =
        tasksListComponent.element.querySelector(".task-list-container");

      for (const task of tasksForStatus) {
        this.#renderTask(task, tasksListElement);
      }
    }
  }

  #renderBasket() {
    const status = Status.BASKET;
    const tasksListComponent = new TaskListComponent(status);
    tasksListComponent.element.setAttribute("data-status", status);
    render(tasksListComponent, this.#tasksBoardComponent.element);

    const tasksForStatus = this.#taskPresenter.getTasksByStatus(status);

    const tasksListElement =
      tasksListComponent.element.querySelector(".task-list-container");

    for (const task of tasksForStatus) {
      this.#renderTask(task, tasksListElement);
    }

    const isDisabled = tasksForStatus.length === 0;

    this.#clearButtonComponent = new ClearButtonComponent(isDisabled);
    this.#clearButtonComponent.setClickHandler(this.#handleResetButtonClick);
    render(this.#clearButtonComponent, tasksListComponent.element);
  }

  #handleResetButtonClick = () => {
    this.#tasksModel.removeTasksByStatus(Status.BASKET);
  };
}


