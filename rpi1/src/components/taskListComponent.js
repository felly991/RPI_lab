import { createElement } from "../framework/render.js";

function createTaskListComponentTemplate() {
  return `<li class="task-container-item">
              <h3 class="title tasks-container-title title-backlog">Корзина</h3>
              <ul class="task-list-container tasks-container-backlog task-list">
              </ul>
            </li>`;
}

export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponentTemplate();
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
}
