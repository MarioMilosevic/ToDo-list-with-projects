"use strict";
import { toggleClass, displayProject, displayTodos } from "./helpers";
import { Project, ProjectManager, Todo } from "./classes";
const projects = document.querySelector(".projects");
const todos = document.querySelector(".todos");
const addProjectBtn = document.querySelector(".addProject");
const addTodoBtn = document.querySelector(".addTodo");
const projectsInputDiv = document.querySelector(".projectsInput");
const cancelBtn = document.querySelector(".cancel");
const projectInput = document.querySelector(".projectInput");
const addBtn = document.querySelector(".add");

const projectMan = new ProjectManager();

addProjectBtn.addEventListener("click", function () {
  toggleClass("hidden", addProjectBtn);
  toggleClass("hidden", projectsInputDiv);
  projectInput.focus();
});

addBtn.addEventListener("click", function () {
  const project = new Project(projectInput.value);
  console.log(project);
  projectMan.add(project);
  projectInput.value = "";
  displayProject(projects, project);
  toggleClass("hidden", addProjectBtn);
  toggleClass("hidden", projectsInputDiv);
});

cancelBtn.addEventListener("click", function () {
  toggleClass("hidden", addProjectBtn);
  toggleClass("hidden", projectsInputDiv);
  projectInput.value = "";
});

projects.addEventListener("click", function (e) {
  const target = e.target;
  if (target.dataset.id) {
    const project = projectMan.filterProject(target.dataset.id);
    console.log(project);
    displayTodos(todos, project)
  } 
});

// kada kliknem na PROJECT da mi se izlistaju ovamo svi njegovi TODO ako ih ima
// moram da ih uzmem iz arraya
// ADD TODO ce da pravi todo-ove i da ih smjesti u Projectov array 

// addTodoBtn.addEventListener('click', function(){
  
//   // const todo = new Todo() 
// })