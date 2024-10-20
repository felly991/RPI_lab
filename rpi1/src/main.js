import HeaderComponent from "./components/headerComponent.js"
import NewTaskComponent from "./components/newTaskComponent.js";
import TasksBoardPresenter from "./presenter/taskBoardPresenter.js";
import TasksModel from "./model/taskModel.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector(".body-app");
const newTaskContainer = document.querySelector(".new-task-container");
const taskArea = document.querySelector(".task-main-container");

const tasksModel = new TasksModel();

const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: taskArea,
  tasksModel,
});

tasksBoardPresenter.init();

function handleNewTaskSubmit(taskTitle) {
  tasksBoardPresenter.addNewTask(taskTitle);
}

const newTaskComponent = new NewTaskComponent(handleNewTaskSubmit);
render(newTaskComponent, newTaskContainer, RenderPosition.AFTERBEGIN);

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

