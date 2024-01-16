"use strict";
import { toggleClass, displayProject, displayTodo } from "./helpers";
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
    displayTodo(todos, project)
  } 
});
