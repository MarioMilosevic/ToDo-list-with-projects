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
const todoList = document.querySelector('.todoList')
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
  if(projectMan.getSelectedProject()) {
    toggleClass("hidden", addTodoBtn);
    toggleClass("hidden", todoInputDiv);
    todoInput.focus();
  } else {
    alert('Select a project first')
  }
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
    const selectedProject = projectMan.getSelectedProject()
    selectedProject.addTodo(todo)
    displayTodos(todoList, todo);
    toggleClass("hidden", addTodoBtn);
    toggleClass("hidden", todoInputDiv);
    todoInput.value = ''
    inputDate.value = ''
  }
});

// na klik selektovanog da se pojave njegovi TODO, i nakon toga da dodavanjem novih TODOa da se oni dodaju u dom i u njegov []

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
    const project = projectMan.findProject(target.dataset.id);
    projectMan.setClickedProject(project);
    // da uzmem todos [] i da svaki pojedinacno ubacim u todoList
    const projectTodos = project.getTodos()
    todoList.innerHTML = ''
    projectTodos.forEach(todo => {
      displayTodos(todoList, todo)
    })
    console.log(projectTodos);
    console.dir(projectTodos);
    console.log(project.getTodos())
  }
  if (e.target.matches(".deleteBtn")) {
    const parentDiv = e.target.parentElement;
    parentDiv.remove();
    const project = projectMan.getSelectedProject();
    projectMan.remove(project);
    projectMan.setClickedProject(null);
  }
});



// kada kliknem na PROJECT da mi se izlistaju ovamo svi njegovi TODO ako ih ima
// moram da ih uzmem iz arraya
// ADD TODO ce da pravi todo-ove i da ih smjesti u Projectov array


