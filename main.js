"use strict";
import {
  toggleClass,
  displayProject,
  displayTodos,
  attachCheckboxEvent,
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

const projectMan = new ProjectManager();

addProjectBtn.addEventListener("click", function () {
  toggleClass("hidden", addProjectBtn);
  toggleClass("hidden", projectsInputDiv);
  projectInput.focus();
});

addTodoBtn.addEventListener("click", function () {
  if (projectMan.getSelectedProject()) {
    toggleClass("hidden", addTodoBtn);
    toggleClass("hidden", todoInputDiv);
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
    attachCheckboxEvent(todoList, todo);
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
  const target = e.target;
  if (target.dataset.id) {
    const projects = [...projectList.children];
    projects.forEach((li) => {
      li.classList.remove("selected");
      const childrenArr = Array.from(li.children);
      childrenArr.forEach((child) => {
        child.classList.remove("selected");
      });
    });
    if (target.matches(".projectTitle")) {
      const parent = target.parentElement;
      parent.classList.add("selected");
    }
    target.classList.add("selected");
    const project = projectMan.findProject(target.dataset.id);
    projectMan.setClickedProject(project);
    const projectTodos = project.getTodos();
    todoList.innerHTML = "";
    projectTodos.forEach((todo) => {
      displayTodos(todoList, todo);
      attachCheckboxEvent(todoList, todo);
    });
  }

  // kada se renderuju TODO da u input proslijedim vrijednost iz stejta todo objekta

  if (target.matches(".deleteBtn")) {
    const parentDiv = e.target.parentElement;
    parentDiv.remove();
    const project = projectMan.getSelectedProject();
    projectMan.remove(project);
    todoList.innerHTML = "";
    projectMan.setClickedProject(null);
  }
});

todoList.addEventListener("click", function (e) {
  const target = e.target;
  // console.log(target);
  // console.log('nadam se ID',target.dataset.id);
  // console.log(e.target.checked);
  // console.log(e.currentTarget);
  // console.dir(e.currentTarget)
  // const todoID = e.currentTarget.dataset.id;
  // const todoID = e.currentTarget.firstElementChild.dataset.id;
  // const todo = selectedProject.findTodo(todoID);
  // console.log(todo);
  // const checkbox = e.currentTarget.firstElementChild.lastElementChild;

  // console.log("chechbox", checkbox);
  // console.log("todoID", todoID);

  if (target.matches(".editTodoButton")) {
    const projectTitleTodo = document.querySelector(".projectTitleTodo");
    const projectDate = document.querySelector(".projectDate");
    const hiddenInputTodo = todoList.querySelector(".todoAction");
    const todoInput = hiddenInputTodo.querySelector('input[type="text"]');
    const dateTodo = hiddenInputTodo.querySelector('input[type="date"]');
    toggleClass("hidden", hiddenInputTodo);

    const saveBtn = hiddenInputTodo.querySelector(".todoActionSave");
    const cancelBtn = hiddenInputTodo.querySelector(".todoActionDelete");

    saveBtn.addEventListener("click", function () {
      projectTitleTodo.innerText = todoInput.value;
      todo.setTodoTitle(projectTitleTodo.innerText);
      todo.setTodoDate(projectDate.innerText);
      projectDate.innerText = dateTodo.value;
      hiddenInputTodo.classList.add("hidden");
      //  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    });

    cancelBtn.addEventListener("click", function () {
      hiddenInputTodo.classList.add("hidden");
    });
  }
  if (target.matches(".deleteTodoButton")) {
    const todoId = e.target.dataset.id;
    const project = projectMan.getSelectedProject();
    project.removeTodo(todoId);
    const li = target.parentElement.parentElement;
    li.remove();
  }
  // checkbox.addEventListener('change',function(){
  //   todo.invertFinished();
  //   console.log(todo.getFinished());
  //   checkbox.checked = todo.getFinished()
  //   console.log(checkbox.checked);

  // })

  if (target.matches(".todoCheckBox")) {
    console.log(target.closest(".todo"));
    console.dir(target.closest(".todo"));
    const id = target.closest('.todo').dataset.id
    
    //   // todo.invertFinished(); // na prvi ce bit TRUE jer je prethodno FALSE
    //   // if (todo.getFinished()) {
    //   //   checkbox.setAttribute("checked", "");
    //   //   // console.log(checkbox.checked);
    //   // } else {
    //   //   checkbox.removeAttribute("checked");
    //   //   // console.log(checkbox.checked);
    //   // }
    //   // if(checkbox.checked){
    //   //   return !checkbox.checked
    //   // } else {
    //   //   checkbox.checked
    //   // }
    //   // checkbox.checked = true ? false : true;
    //   // console.log('stejt finished', todo.getFinished());
    //   // console.log(checkbox.checked)
  }
});
// onda kasnije da provjerim za CHECKBOX da state ostane uvjek isti kada izadjem i ponovo pogledam u projekat

// STRIK OSTAJE KAKO TREBA, NEGO MORAM DA PROVJERIM SELEKTOVANJE INPUTA I TODOa preko IDa
