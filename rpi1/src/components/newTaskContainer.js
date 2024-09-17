import { createElement } from "../framework/render.js";

function createNewTaskComponentTemplate() {
  return   `<div><h3 class="title new-task-container-title">
                    Новая задача
                </h3>
                <form action="#" class="new-task-container-form">
            <input
              class="new-task-container-input-holder"
              type="text"
              placeholder="Название задачи..."
            />
            <button class="new-task-container-add-button btn">Добавить</button>
          </form> </div>`;
}

export default class NewTaskComponent {
  getTemplate() {
    return createNewTaskComponentTemplate();
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
