import TaskListComponent from "../components/taskListComponent.js";
import TaskComponent from "../components/task.js";
import TaskAreaComponent from "../components/taskAreaComponent.js";
import { StatusArray } from "../consts.js";
import { render } from "../framework/render.js";

export default class TasksBoardPresenter {
  tasksBoardComponent = new TaskAreaComponent();

  constructor({ boardContainer, tasksModel }) {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;
  }

  init() {
    this.boardTasks = [...this.tasksModel.getTasks()];

    render(this.tasksBoardComponent, this.boardContainer);
    debugger;
    for (const status of StatusArray) {
      const tasksListComponent = new TaskListComponent(status);
      render(tasksListComponent, this.tasksBoardComponent.getElement());

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
}
