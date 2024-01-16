"use strict";

export const toggleClass = (cl, el) => {
  el.classList.toggle(cl);
};

export const displayProject = (parent, child) => {
  const project = document.createElement("div");
  project.classList.add("project");
  project.dataset.id = child.id
  project.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 projectIcon" data-id="${child.id}">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
</svg>
    <p>${child.projectName}</p>
    <button data-class="deleteBtn" class="deleteBtn" data-id=${child.id}>X</button>`;
  parent.appendChild(project);
};

export const displayTodos = (parent,child) => {
  const todo = document.createElement('div')
  const todoInput = document.createElement('div')
  todo.classList.add('todo')
  todoInput.classList.add('todoInput')
  todo.innerHTML = `<button class="todoButton"></button>
  <p class="todoParagraph">Probni text</p>
  <input type="date">`
  parent.prepend(todo)
}