import { AbstractComponent } from './view/abstractComponent.js';

const RenderPosition = {
  BEFOREBEGIN: "beforebegin",
  AFTERBEGIN: "afterbegin",
  BEFOREEND: "beforeend",
  AFTEREND: "afterend",
};

function createElement(template) {
  const newElement = document.createElement("div");
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!(component instanceof AbstractComponent)) {
    throw new Error('Рендер только конмонентов');
  }
   if (container === null) {
    throw new Error('Элемент контейнера не существует');
  }
   container.insertAdjacentElement(place, component.element);
}


export { RenderPosition, createElement, render };
