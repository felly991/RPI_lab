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
  get template() {
    return createNewTaskComponentTemplate();
  }
}
