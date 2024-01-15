'use strict'
const projects = document.querySelector('.projects')
const todos = document.querySelector('.todos')
const addProjectBtn = document.querySelector('.addProject')
const addTodoBtn = document.querySelector('.addTodo')
const projectsInputDiv = document.querySelector('.projectsInput')

addProjectBtn.addEventListener('click', function(){
    addProjectBtn.classList.add('hidden')
    projectsInputDiv.classList.remove('hidden')
})

// const createInput = () => {
//     const input = document.create
// }