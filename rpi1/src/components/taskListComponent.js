import { createElement } from "../framework/render.js";
import { StatusLabel } from "../consts.js";

function createTaskListComponentTemplate(status) {
  return `<li class="task-container-item">
              <h3 class="title tasks-container-title title-${status}">${StatusLabel[status]}</h3>
              <ul class="task-list-container tasks-container-${status} task-list">
              </ul>
            </li>`;
}

export default class TaskListComponent {
  constructor(status) {
    this.status = status;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.status);
  }

}
