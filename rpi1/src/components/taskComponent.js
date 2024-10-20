import { AbstractComponent } from "../framework/view/abstractComponent.js";

function createTaskComponentTemplate(task) {
  return `<li class="task-item">${task.title}</li>`;
}

export default class TaskComponent extends AbstractComponent {
  constructor({ task }) {
    super();
    this.task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }
}
