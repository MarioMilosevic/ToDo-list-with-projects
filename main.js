"use strict";
import {
  toggleClass,
  displayProject,
  displayTodos,
  deleteProjectHandler,
  removeClass,
  getProject,
  getProjectTodos,
  emptyList,
  addClass,
  deleteTodo,
  changeCheckbox,
  editTodoHandler,
} from "./helpers";
import { Project, ProjectManager, Todo } from "./classes";
import Swal from "sweetalert2";

const addProjectBtn = document.querySelector(".addProject");
const addTodoBtn = document.querySelector(".addTodo");
const projectsInputDiv = document.querySelector(".projectsInput");
const cancelBtn = document.querySelector(".cancel");
const projectInput = document.querySelector(".projectInput");
const addBtn = document.querySelector(".add");
const projectList = document.querySelector(".projectList");
const todoList = document.querySelector(".todoList");
const todoInputDiv = document.querySelector(".todoInputDiv");
const inputDate = document.querySelector(".inputDate");
const todoInput = document.querySelector(".todoInput");
const greenAddTodo = document.querySelector(".greenAddTodo");
const redCancelTodo = document.querySelector(".redCancelTodo");

export const projectMan = new ProjectManager();

addProjectBtn.addEventListener("click", function () {
  toggleClass("hidden", addProjectBtn);
  toggleClass("hidden", projectsInputDiv);
  projectInput.focus();
});

addTodoBtn.addEventListener("click", function () {
  if (projectMan.getSelectedProject()) {
    toggleClass("hidden", addTodoBtn);
    toggleClass("hidden", todoInputDiv);
    projectsInputDiv.classList.add("hidden");
    addProjectBtn.classList.remove("hidden");
    todoInput.focus();
  } else {
    Swal.fire({
      icon: "error",
      title: "Todo ?",
      text: "Select a project first",
    });
  }
});

redCancelTodo.addEventListener("click", function () {
  toggleClass("hidden", addTodoBtn);
  toggleClass("hidden", todoInputDiv);
});

greenAddTodo.addEventListener("click", function () {
  if (todoInput.value === "" || inputDate.value === "") {
    Swal.fire({
      icon: "error",
      title: "Todo ?",
      text: "Input or date field are not filled properly",
    });
  } else {
    const todo = new Todo(todoInput.value, inputDate.value);
    const selectedProject = projectMan.getSelectedProject();
    selectedProject.addTodo(todo);
    displayTodos(todoList, todo);
    toggleClass("hidden", addTodoBtn);
    toggleClass("hidden", todoInputDiv);
    todoInput.value = "";
    inputDate.value = "";
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
  const projectListChildren = [...projectList.children];
  removeClass(projectListChildren);
  const projectElement = e.target.closest(".project");
  getProject(projectElement);
  addClass(projectElement, "selected");
  emptyList(todoList);
  const projectTodos = getProjectTodos();
  projectTodos.forEach((todo) => {
    displayTodos(todoList, todo);
  });
  deleteProjectHandler(e);
});

todoList.addEventListener("click", function (e) {
  const target = e.target;
  editTodoHandler(target);
  deleteTodo(target);
  changeCheckbox(target);
});
