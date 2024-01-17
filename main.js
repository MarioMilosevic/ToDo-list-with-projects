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
const todoCheckLogo = document.querySelector(".todoCheckLogo");
const projectList = document.querySelector(".projectList");
//
const todoInputDiv = document.querySelector(".todoInputDiv");
const inputDate = document.querySelector(".inputDate");
const todoInput = document.querySelector(".todoInput");
const greenAddTodo = document.querySelector(".greenAddTodo");
const redCancelTodo = document.querySelector(".redCancelTodo");
//
const projectMan = new ProjectManager();

addProjectBtn.addEventListener("click", function () {
  toggleClass("hidden", addProjectBtn);
  toggleClass("hidden", projectsInputDiv);
  projectInput.focus();
});

todoCheckLogo.addEventListener("click", function () {
  toggleClass("hidden", addTodoBtn);
  toggleClass("hidden", todoInputDiv);
  todoInput.focus();
});

redCancelTodo.addEventListener("click", function () {
  toggleClass("hidden", addTodoBtn);
  toggleClass("hidden", todoInputDiv);
});

greenAddTodo.addEventListener("click", function () {
  if (todoInput.value === "" || inputDate.value === "") {
    alert("Input or date fields are not properly filled");
  } else {
    const todo = new Todo(todoInput.value, inputDate.value);
    displayTodos(todos, todo);
    toggleClass("hidden", addTodoBtn);
    toggleClass("hidden", todoInputDiv);
  }
});

addBtn.addEventListener("click", function () {
  const project = new Project(projectInput.value);
  projectMan.add(project);
  projectInput.value = "";
  displayProject(projectList, project);
  toggleClass("hidden", addProjectBtn);
  toggleClass("hidden", projectsInputDiv);
});

cancelBtn.addEventListener("click", function () {
  toggleClass("hidden", addProjectBtn);
  toggleClass("hidden", projectsInputDiv);
  projectInput.value = "";
});

projectList.addEventListener("click", function (e) {
  const target = e.target;
  if (target.dataset.id) {
    const projects = [...projectList.children];
    projects.forEach((li) => {
      li.classList.remove("selected");
    });
    target.classList.add("selected");
    console.dir(target.dataset.id);
    const project = projectMan.findProject(target.dataset.id);
    projectMan.setClickedProject(project);
    if (project === projectMan.getSelectedProject()) {
      console.log("to je to");
    }
    const selectedProject = projectMan.getSelectedProject();
  }
  if (e.target.matches(".deleteBtn")) {
    const parentDiv = e.target.parentElement;
    parentDiv.remove();
    const project = projectMan.getSelectedProject();
    projectMan.remove(project);
    projectMan.setClickedProject(null);
  }
});

// klikom na BUTTON trebam da nadjem array projekata, i preko CLICKED da ga maknem iz arraya, pa da vratim ove sto postoje

// kada kliknem na PROJECT da mi se izlistaju ovamo svi njegovi TODO ako ih ima
// moram da ih uzmem iz arraya
// ADD TODO ce da pravi todo-ove i da ih smjesti u Projectov array

// const todo = new Todo(text, datum)
// project.addTodo(todo)

// addTodoBtn.addEventListener('click', function(){

//   // const todo = new Todo()
// })
