"use strict";
import { nanoid } from "nanoid";

export class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.id = nanoid();
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }
  getTodos() {
    return this.todos;
  }
}

export class ProjectManager {
  constructor() {
    this.projects = [];
    this.clicked = null;
  }
  getProjects() {
    return this.projects;
  }
  add(project) {
    this.projects.push(project);
  }

  setClickedProject(project){
    this.clicked = project
  }

  getSelectedProject(){
    return this.clicked
  }

  findProject(id) {
    const target = this.projects.find((el) => el.id === id);
    return target;
  }
}

export class Todo {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
}
