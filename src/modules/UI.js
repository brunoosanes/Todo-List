import { newProjectObj, projects, removeProjectObj } from "./projects";
import { newTask, removeTaskFromProj, removeNulls } from "./task";

const header = document.querySelector(".header");
// GET HTML ELEMENTS
const projectsContainer = document.querySelector(".projectsContainer");
const removeProjectBtn = document.querySelector(".removeProjectBtn");
const newProjectBtn = document.querySelector(".newProjectBtn");
const newProjectBoxContainer = document.querySelector(
  ".newProjectBoxContainer"
);
const cancelProjectBtn = document.querySelector(".cancelProjectBtn");
const titleInput = document.querySelector(".titleInput");
const descriptionInput = document.querySelector(".descriptionInput");
const addBtn = document.querySelector(".addBtn");
const projectDisplayer = document.querySelector(".projectDisplayer");
const description = document.querySelector(".description");
const newTaskBtn = document.querySelector(".newTaskBtn");
const newTaskBoxContainer = document.querySelector(".newTaskBoxContainer");
const cancelTaskBtn = document.querySelector(".cancelTaskBtn");
const taskNameInput = document.querySelector(".taskNameInput");
const addTaskBtn = document.querySelector(".addTaskBtn");
const tasksContainer = document.querySelector(".tasksContainer");
const removeTaskBtn = document.querySelector('.removeTaskBtn')

let getAllProjectsDivs = function () {
  return document.querySelectorAll(".project");
};

// PROJECT DISPLAY FUNCTIONS:

function displayProjects() {
  projectsContainer.textContent = "";
  projects.forEach((project) => {
    const newProjectDiv = document.createElement("div");
    newProjectDiv.classList.add("project");
    newProjectDiv.textContent = project.title;
    projectsContainer.appendChild(newProjectDiv);
  });
}

function getCurrentProjectName() {
  return document.querySelector(".current").textContent;
}

function getObjThatHasProjName() {
  const projName = getCurrentProjectName();
  const projObj = projects.filter((project) => project.title == projName);
  return projObj;
}

//remove current class from projects:

function projectClick(e) {
  removeCurrentClass();
  addCurrentClass(e);
  projectDisplayer.classList.add("show"); 

  const projName = getObjThatHasProjName();
  displayDescriptionOnClick(projName);
  displayTasks();
}

function projectUpdate(e) {
  projectDisplayer.classList.add("show"); 

  const projName = getObjThatHasProjName();
  displayDescriptionOnClick(projName);
  displayTasks();
}

function removeCurrentClass() {
  const projDivs = getAllProjectsDivs();
  [...projDivs].forEach((p) => p.classList.remove("current"));
}

function addCurrentClass(e) {
  e.target.classList.add("current");
}

function removeProject() {
  const current = getCurrentProjectName();
  removeProjectObj(current);
  displayProjects();
  addE();
  displayTasks();
}

// display description
function displayDescription(project) {
  description.textContent = project.description;
}
function displayDescriptionOnClick(project) {
  description.textContent = project[0].description;
}

// add task to project

function addTask() {
  if(taskNameInput === '') {return}
  const title = taskNameInput.value;
  const priority = document.querySelector("select").value;
  const projectName = getCurrentProjectName();

  newTask(title, priority, projectName);
  hideTaskBox();
  displayTasks();
}

// display tasks

function displayTasks() {
  tasksContainer.textContent = "";
  const currentProj = getCurrentProjectName();
  const proj = projects.find((p) => p.title == currentProj);
  const tasks = proj.tasks; 
  const filteredTasks = tasks.filter((task)=> { return task.priority !== null})
  if (filteredTasks.length <= 0) {
    return
  }
  filteredTasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    const prio = task.priority;
    taskDiv.classList.add("task");
    taskDiv.classList.add(`${prio}`);
    taskDiv.addEventListener("click", selectTask);
    taskDiv.textContent = task.title;
    tasksContainer.appendChild(taskDiv);
  });
}

// add selected class to tasks

function selectTask(e) {
  const allTaks = document.querySelectorAll('.task');
  [...allTaks].forEach((task) => {task.classList.remove('selected')})  
  e.target.classList.add('selected')
}

//remove task
function removeTask() {
  const projectObj = getCurrentProjectName()
  const projDiv = document.querySelector('.current')
  removeNulls(projectObj)
  const currentTaskName = document.querySelector('.selected').textContent;
  removeTaskFromProj(projectObj,currentTaskName);
  projectUpdate(document.querySelector('.current'))
  displayTasks()
}

// PROJECT BOX

function showProjectBox() {
  newProjectBoxContainer.classList.add("show");
}

function hideProjectBox() {
  newProjectBoxContainer.classList.remove("show");
  titleInput.value = "";
  descriptionInput.value = "";
}

// TASK BOX

function showTaskBox() {
  newTaskBoxContainer.classList.add("show");
}

function hideTaskBox() {
  newTaskBoxContainer.classList.remove("show");
  taskNameInput.value = "";
}

// ADD NEW PROJECT - falta adicionar data e tasks
function addProject() {
  const title = titleInput.value;
  const description = descriptionInput.value;

  const newProj = newProjectObj(title, description);
  displayProjects();
  displayDescription(newProj);
  hideProjectBox();
  addE();
}

// EVENT LISTENERS
function addE() {
  let projectsDivs = getAllProjectsDivs();
  [...projectsDivs].forEach((project) => {
    project.addEventListener("click", projectClick);
  });
}

removeProjectBtn.addEventListener("click", removeProject);
newProjectBtn.addEventListener("click", showProjectBox);
cancelProjectBtn.addEventListener("click", hideProjectBox);
addBtn.addEventListener("click", addProject);
newTaskBtn.addEventListener("click", showTaskBox);
cancelTaskBtn.addEventListener("click", hideTaskBox);
addTaskBtn.addEventListener("click", addTask);
removeTaskBtn.addEventListener('click', removeTask)

header.addEventListener("click", displayTasks);
export { displayProjects, addE };
