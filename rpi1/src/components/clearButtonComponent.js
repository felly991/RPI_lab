import { AbstractComponent } from "../framework/view/abstractComponent.js";

function createClearButtonComponentTemplate(isDisabled) {
  return `<button class="clearButton btn"${
    isDisabled ? " disabled" : ""
  }>X Очистить</button>`;
}

export default class ClearButtonComponent extends AbstractComponent {
  #isDisabled = false;

  constructor(isDisabled) {
    super();
    this.#isDisabled = isDisabled;
  }

  get template() {
    return createClearButtonComponentTemplate(this.#isDisabled);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener("click", this.#onClick);
  }

  #onClick = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
