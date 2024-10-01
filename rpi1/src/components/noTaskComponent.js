import { AbstractComponent } from "../framework/view/abstractComponent.js";

function createNoTaskComponentTemplate() {
  return `<p class="task-item">Нет задач</p>`;
}

export default class NoTaskComponent extends AbstractComponent {
  get template() {
    return createNoTaskComponentTemplate();
  }
}
