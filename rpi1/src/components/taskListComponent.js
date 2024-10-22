import { AbstractComponent } from "../framework/view/abstractComponent.js";
import { StatusLabel } from "../consts.js";

function createTaskListComponentTemplate(status) {
  return `<li class="task-container-item">
              <h3 class="title tasks-container-title title-${status}">${StatusLabel[status]}</h3>
              <ul class="task-list-container tasks-container-${status} task-list">
              </ul>
            </li>`;
}

export default class TaskListComponent extends AbstractComponent {
  constructor({ status, onTaskDrop = null }) {
    super();
    this.status = status;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListComponentTemplate(this.status);
  }

  #setDropHandler(onTaskDrop) {
    if (!onTaskDrop) return;

    const container = this.element;

    container.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    container.addEventListener("drop", (event) => {
      event.preventDefault();

      const taskId = event.dataTransfer.getData("text/plain");
      onTaskDrop(taskId, this.status);
    });
  }
}
