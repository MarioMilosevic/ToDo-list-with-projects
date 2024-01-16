"use strict";
import { nanoid } from "nanoid";

export class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.id = nanoid();
    this.todos = []
  }

  addTodo(todo){
    this.todos.push(todo)
  }
}

export class ProjectManager {
  constructor() {
    this.projects = [];
  }
  getProjects() {
    return this.projects;
  }
  add(project) {
    this.projects.push(project);
  }

  filterProject(id) {
    const target = this.projects.filter((el) => el.id === id);
    return target;
  }
}

export class Todo {
  constructor(description) {
    this.description = description;
  }
}


