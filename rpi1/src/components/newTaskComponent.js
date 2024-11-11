import { AbstractComponent } from "../framework/view/abstractComponent.js";

function createNewTaskComponentTemplate() {
  return   `<div><h3 class="title new-task-container-title">
                    Новая задача
                </h3>
                <form action="#" class="new-task-container-form">
          <input
          class="new-task-container-input-holder"
          type="text"
          placeholder="Название задачи..."
          required
        />
        <button type="submit" class="new-task-container-add-button btn">+ Добавить</button>
      </form>
    </div>`;
}

export default class NewTaskComponent extends AbstractComponent {
  #handleFormSubmit = null;

  constructor(handleFormSubmit) {
    super();
    this.#handleFormSubmit = handleFormSubmit;
    this._setInnerHandlers();
  }

  get template() {
    return createNewTaskComponentTemplate();
  }

  _setInnerHandlers() {
    this.element
      .querySelector(".new-task-container-form")
      .addEventListener("submit", this.#formSubmitHandler.bind(this));
  }

  #formSubmitHandler(evt) {
    evt.preventDefault();
    const inputElement = this.element.querySelector(".new-task-container-input-holder");
    const taskTitle = inputElement.value.trim();
    if (taskTitle) {
      this.#handleFormSubmit(taskTitle);
      inputElement.value = "";
    }
  }
}
