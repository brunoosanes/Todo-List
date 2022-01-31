import { projects, updateProjectsLS } from "./projects";

function newTask(title, priority, project) {
  const task = { title, priority };
  const proj = projects.find((p) => p.title == project);
  proj.tasks.push(task);
  updateProjectsLS();
}

const removeTaskFromProj = function (projectName, taskName) {
  let taskToRemove = taskName;
  let objName = projectName;
  let esseObj = projects.find((p) => p.title == projectName);
  let index = projects.indexOf(esseObj);
  let projectTasks = projects[index].tasks;
  let taskToRemoveObj = projectTasks.find((task) => {
    return task.title == taskToRemove;
  });
  let taskIndex = projects[index].tasks.indexOf(taskToRemoveObj);

  let p = projects[index].tasks.filter(
    (task) => task.title !== taskName || null
  );

  projects[index].tasks = p;
  updateProjectsLS();
};

function removeNulls(projectName) {
  let esseObj = projects.find((p) => p.title == projectName);
  let index = projects.indexOf(esseObj);
  let p = projects[index].tasks.filter((task) => task.title !== null);

  projects[index].tasks = p;
  updateProjectsLS();
}

export { newTask, removeTaskFromProj, removeNulls };
