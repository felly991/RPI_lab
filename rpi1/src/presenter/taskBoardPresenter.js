import TaskListComponent from "../components/taskListComponent.js";
import TaskAreaComponent from "../components/taskAreaComponent.js";
import { StatusArray, Status, UserAction } from "../consts.js";
import { render } from "../framework/render.js";
import TaskPresenter from "./taskPresenter.js";
import ClearButtonComponent from "../components/clearButtonComponent.js"
import TaskComponent from "../components/taskComponent.js"
import NoTaskComponent from "../components/noTaskComponent.js";
import LoaderComponent from "../components/loaderComponent.js";


export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #taskPresenter = null;

  #isLoading = false;
  #loaderComponent = new LoaderComponent();

  #tasksBoardComponent = new TaskAreaComponent();
  #clearButtonComponent = null;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#taskPresenter = new TaskPresenter({ tasksModel: this.#tasksModel });

    this.#tasksModel.addObserver(this.#handleModelEvent);
  }

  async init() {
    this.#isLoading = true;
    this.#renderLoader();

    try {
      await this.#tasksModel.init();
      this.#isLoading = false;
      this.#clearLoader();
      this.#renderBoard();
      this.#renderTaskList();
      this.#renderBasket();
    } catch (err) {
      console.error("Ошибка при инициализации:", err);
    }
  }

  async addNewTask(taskTitle) {
    if (!taskTitle) {
      return;
    }
    this.#isLoading = true;
    this.#renderLoader();

    try {
      await this.#tasksModel.addTask(taskTitle);
      document.querySelector(".new-task-container-input-holder").value = "";
    } catch (err) {
      console.error("Ошибка при создании задачи:", err);
    } finally {
      this.#isLoading = false;
      this.#clearLoader();
    }
  }

  #handleModelEvent = (event, payload) => {
    switch (event) {
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
      case UserAction.CLEAR_BASKET:
        this.#clearBoard();
        this.#renderTaskList();
        this.#renderBasket();
        break;
    }
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
      const tasksListComponent = new TaskListComponent({
        status,
        onTaskDrop: this.#handleTaskDrop.bind(this),
      });
      tasksListComponent.element.setAttribute("data-status", status);
      render(tasksListComponent, this.#tasksBoardComponent.element);

      const tasksForStatus = this.#taskPresenter.getTasksByStatus(status);

      const tasksListElement =
        tasksListComponent.element.querySelector(".task-list-container");

      if (tasksForStatus.length === 0) {
        const noTaskComponent = new NoTaskComponent();
        render(noTaskComponent, tasksListElement);
      } else {
        for (const task of tasksForStatus) {
          this.#renderTask(task, tasksListElement);
        }
      }
    }
  }

  #renderBasket() {
    const status = Status.BASKET;
    const tasksListComponent = new TaskListComponent({
      status,
      onTaskDrop: this.#handleTaskDrop.bind(this),
    });
    tasksListComponent.element.setAttribute("data-status", status);
    render(tasksListComponent, this.#tasksBoardComponent.element);

    const tasksForStatus = this.#taskPresenter.getTasksByStatus(status);

    const tasksListElement =
      tasksListComponent.element.querySelector(".task-list-container");

    if (tasksForStatus.length === 0) {
      const noTaskComponent = new NoTaskComponent();
      render(noTaskComponent, tasksListElement);
    } else {
      for (const task of tasksForStatus) {
        this.#renderTask(task, tasksListElement);
      }
    }

    const isDisabled = tasksForStatus.length === 0;

    this.#clearButtonComponent = new ClearButtonComponent(isDisabled);
    this.#clearButtonComponent.setClickHandler(this.#handleClearButtonClick);
    render(this.#clearButtonComponent, tasksListComponent.element);
  }

  #handleClearButtonClick = async () => {
    try {
      await this.#tasksModel.clearBasketTasks();
    } catch (err) {
      console.error("Ошибка при очистке корзины:", err);
    }
  };

  async #handleTaskDrop(taskId, newStatus) {
    this.#isLoading = true;
    this.#renderLoader();
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus);
      this.#isLoading = false;
      this.#clearLoader();
    } catch (err) {
      console.error("Ошибка при обновлении статуса задачи:", err);
    }
  }

  #renderLoader() {
    if (this.#isLoading) {
      render(this.#loaderComponent, this.#boardContainer);
    }
  }

  #clearLoader() {
    if (!this.#isLoading) {
      this.#loaderComponent.element.remove();
    }
  }
}



