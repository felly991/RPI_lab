import { createElement } from "../render.js";

export class AbstractComponent {
  #element = null;
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(
        "Невозможно создать экземпляр AbstractComponent"
      );
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }
  
  get template() {
    throw new Error("Абстрактный метод, который не реализован: получить шаблон");
  }

  removeElement() {
    this.#element = null;
  }
}
