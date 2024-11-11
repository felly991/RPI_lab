import { AbstractComponent } from "../framework/view/abstractComponent.js";

function createLoaderComponentTemplate() {
  return `<div class="loader">Загрузка данных...</div>`;
}

export default class LoaderComponent extends AbstractComponent {
  get template() {
    return createLoaderComponentTemplate();
  }
}
