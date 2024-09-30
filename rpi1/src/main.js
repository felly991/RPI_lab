import HeaderComponent from "./components/headerComponent.js"
import NewTaskComponent from "./components/newTaskContainer.js";
import TaskAreaComponent from "./components/taskAreaComponent.js";
import TaskListComponent from "./components/taskListComponent.js";
import TaskComponent from "./components/task.js";
import TasksBoardPresenter from "./presenter/taskBoardPresenter.js";
import TasksModel from "./model/taskModel.js";
import { StatusArray } from "./consts.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector(".body-app");
const newTask = document.querySelector(".new-task-container");
const taskArea = document.querySelector(".task-main-container");

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new NewTaskComponent(), newTask, RenderPosition.AFTERBEGIN);
render(new TaskAreaComponent(), taskArea, RenderPosition.BEFOREEND);

const tasksAreaList = document.querySelector(".task-main-container-list");

const tasksModel = new TasksModel();
const tasks = [...tasksModel.getTasks()];

for (let i = 0; i < StatusArray.length; i++) {
  const status = StatusArray[i];
  const taskListComponent = new TaskListComponent(status);
  render(taskListComponent, tasksAreaList, RenderPosition.BEFOREEND);

  const tasksList = taskListComponent.getElement().querySelector(".task-list-container");

  const tasksForStatus = tasks.filter((task) => task.status === status);

  for (let j = 0; j < tasksForStatus.length; j++) {
    const task = tasksForStatus[j];
    render(new TaskComponent({ task }), tasksList, RenderPosition.BEFOREEND);
  }
}

const tasksBoardPresenter = new TasksBoardPresenter({bodyContainer: taskArea, tasksModel});

tasksBoardPresenter.init();

