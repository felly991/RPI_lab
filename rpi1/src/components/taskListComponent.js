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
  constructor(status) {
    super();
    this.status = status;
  }

  get template() {
    return createTaskListComponentTemplate(this.status);
  }
}

