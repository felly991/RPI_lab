import { AbstractComponent } from "../framework/view/abstractComponent.js";

function createTaskAreaComponentTemplate() {
  return `<ul class="task-main-container-list task-list">
          </ul>`;
}

export default class extends AbstractComponent {
  get template() {
    return createTaskAreaComponentTemplate();
  }
}
