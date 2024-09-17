import HeaderComponent from "./components/headerComponent.js"
import NewTaskComponent from "./components/newTaskContainer.js";
import TaskAreaComponent from "./components/taskAreaComponent.js";
import TaskListComponent from "./components/taskListComponent.js";
import TaskComponent from "./components/task.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector(".body-app");
const newTask = document.querySelector(".new-task-container");
const taskArea = document.querySelector(".task-main-container");

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new NewTaskComponent(), newTask, RenderPosition.AFTERBEGIN);
render(new TaskAreaComponent(), taskArea, RenderPosition.BEFOREEND);

const tasksAreaList = document.querySelector(".task-main-container-list");

for (let i = 0; i < 4; i++) {
  const taskListComponent = new TaskListComponent();
  render(taskListComponent, tasksAreaList, RenderPosition.BEFOREEND);

  let tasksList = taskListComponent.getElement().querySelector(".task-list-container");

  for (let j = 0; j < 4; j++) {
    render(new TaskComponent(), tasksList, RenderPosition.BEFOREEND);
  }
}
