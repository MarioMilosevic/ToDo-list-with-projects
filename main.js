'use strict'
import { toggleClass } from "./helpers"
import { Project, ProjectManager } from "./classes"
const projects = document.querySelector('.projects')
const todos = document.querySelector('.todos')
const addProjectBtn = document.querySelector('.addProject')
const addTodoBtn = document.querySelector('.addTodo')
const projectsInputDiv = document.querySelector('.projectsInput')
const cancelBtn = document.querySelector('.cancel')
const projectInput = document.querySelector('.projectInput')
const addBtn = document.querySelector('.add')

const projectMan = new ProjectManager()

addProjectBtn.addEventListener('click', function(){
    toggleClass('hidden', addProjectBtn)
    toggleClass('hidden', projectsInputDiv)
})

addBtn.addEventListener('click', function(){
    const project = new Project(projectInput.value)
    projectMan.add(project)
    projectInput.value = ''
    console.log(projectMan.getProjects());
})

cancelBtn.addEventListener('click', function(){
    toggleClass('hidden', addProjectBtn)
    toggleClass('hidden', projectsInputDiv)
})