let projects;
if (localStorage.projects) {
  projects = JSON.parse(localStorage.projects);
} else projects = [];

const newProjectObj = function (title, description) {
  let newObj = { title, description, tasks: [] };
  projects.push(newObj);
  updateProjectsLS();
  return newObj;
};

function updateProjectsLS() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

const removeProjectObj = function (projectName) {
  let p = projects.filter((proj) => proj.title !== projectName);
  console.log(p);
  projects = p;
  updateProjectsLS();
};

export { newProjectObj, projects, removeProjectObj, updateProjectsLS };
