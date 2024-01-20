"use strict";
import { projectMan } from "./main";
export const toggleClass = (cl, el) => {
  el.classList.toggle(cl);
};

export const displayProject = (parent, child) => {
  const project = document.createElement("li");
  project.classList.add("project");
  project.dataset.id = child.id;
  project.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 projectIcon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
</svg>
    <p class="projectTitle" data-id="${child.id}">${child.projectName}</p>
    <button data-class="deleteBtn" class="deleteBtn" data-id=${child.id}>X</button>`;
  parent.appendChild(project);
};

export const displayTodos = (parent, child) => {
  const todo = document.createElement("li");
  const todoAction = document.createElement("li");
  todoAction.classList.add("todoAction", "hidden");
  todoAction.innerHTML = `
  <div class="todoActionInformation">
  <p>Todo:</p>
  <input type="text" value="${child.title}"> 
  <div class="actionDate">
  <p>Due date: </p><input type="date" value="${child.date}">
  </div>

  </div>
  <div class="todoActionButtons">
  <button class="todoActionSave">Save</button>
  <button class="todoActionDelete">Cancel</button>
  </div>
  `;

  todo.classList.add("todo");
  todo.dataset.id = child.id;
  // ako je finished true, onda checked, else ''/null
  let checked = child.finished ? "checked" : "";
  todo.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 todoSvg">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
<div class="todoTitle">
<p class="pTitle">Title:</p>
<p class="projectTitleTodo">${child.title}</p>
</div>
<div class="todoDate">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>
<div class="todoDateSubDiv">
<p class="pDate">Due date: </p>
<p class="projectDate">${child.date}</p>
</div>
</div>
  <div class="todoInputButtons">
  <button class="editTodoButton">Edit</button>
  <button class="deleteTodoButton">Delete</button>
  </div>
  <input class="todoCheckBox" type="checkbox" ${checked}>`;
  parent.append(todo, todoAction);
};

export const deleteProjectHandler = (e) => {
  if (e.target.matches(".deleteBtn")) {
    const parentDiv = e.target.parentElement;
    parentDiv.remove();
    const project = projectMan.getSelectedProject();
    projectMan.remove(project);
    todoList.innerHTML = "";
    projectMan.setClickedProject(null);
  }
};

export const removeClass = (list) => {
  list.forEach((child) => {
    child.classList.remove("selected");
  });
};

export const addClass = (el, cl) => {
  el.classList.add(cl);
};

export const getProject = (projectElement) => {
  const projectID = projectElement.dataset.id;
  projectElement.classList.add("selected");
  const project = projectMan.findProject(projectID);
  projectMan.setClickedProject(project);
};

export const getProjectTodos = () => {
  const selectedProject = projectMan.getSelectedProject();
  const projectTodos = selectedProject.getTodos();
  return projectTodos;
};

export const emptyList = (list) => {
  list.innerHTML = "";
};

export const deleteTodo = (target) => {
  if (target.matches(".deleteTodoButton")) {
    const todo = target.parentElement.parentElement;
    const todoID = todo.dataset.id;
    const project = projectMan.getSelectedProject();
    project.removeTodo(todoID);
    const li = target.parentElement.parentElement;
    li.remove();
  }
};

export const changeCheckbox = (target) => {
  if (target.matches(".todoCheckBox")) {
    const todoID = target.closest(".todo").dataset.id;
    const selectedProject = projectMan.getSelectedProject();
    const selectedTtodo = selectedProject.findTodo(todoID);
    selectedTtodo.invertFinished();
  }
};

export const editTodoHandler = (target) => {
  if (target.matches(".editTodoButton")) {
    const todo = target.parentElement.parentElement;
    const todoID = todo.dataset.id;
    const selectedProject = projectMan.getSelectedProject();
    const selectedTodo = selectedProject.findTodo(todoID);

    const projectTitleTodo = todo.querySelector(".projectTitleTodo");
    const projectDate = todo.querySelector(".projectDate");
    const hiddenInputTodo = todo.nextElementSibling;
    const todoInput = hiddenInputTodo.querySelector('input[type="text"]');
    const dateTodo = hiddenInputTodo.querySelector('input[type="date"]');
    toggleClass("hidden", hiddenInputTodo);

    const saveBtn = hiddenInputTodo.querySelector(".todoActionSave");
    const cancelBtn = hiddenInputTodo.querySelector(".todoActionDelete");

    saveBtn.addEventListener("click", function () {
      projectTitleTodo.innerText = todoInput.value;
      selectedTodo.setTodoTitle(projectTitleTodo.innerText);
      selectedTodo.setTodoDate(projectDate.innerText);
      projectDate.innerText = dateTodo.value;
      hiddenInputTodo.classList.add("hidden");
    });

    cancelBtn.addEventListener("click", function () {
      hiddenInputTodo.classList.add("hidden");
    });
  }
};
