"use strict";

export const toggleClass = (cl, el) => {
  el.classList.toggle(cl);
};

export const displayProject = (parent, child) => {
  const project = document.createElement("li");
  project.classList.add("project");
  project.dataset.id = child.id;
  project.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 projectIcon" data-id="${child.id}">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
</svg>
    <p>${child.projectName}</p>
    <button data-class="deleteBtn" class="deleteBtn" data-id=${child.id}>X</button>`;
  parent.appendChild(project);
};

export const displayTodos = (parent, child) => {
  const todo = document.createElement("li");
  todo.classList.add("todo");
  todo.dataset.id = child.id;
  todo.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 todoSvg">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
<div class="todoTitle">
<p>${child.title}</p>
</div>
  <p>Due date:${child.date}</p>
  <div class="todoInputButtons">
  <button class="editTodoButton">Edit</button>
  <button data-id=${child.id} class="deleteTodoButton">Delete</button>
  </div>
  <input class="todoCheckBox" type="checkbox">`;
  parent.appendChild(todo);
};

