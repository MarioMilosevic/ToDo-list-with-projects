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
  removeTodo(todoId) {
    this.todos = this.todos.filter((el) => el.id !== todoId);
  }
  getTodos() {
    return this.todos;
  }

  findTodo(todoId) {
    const todo = this.todos.find((el) => el.id === todoId);
    return todo;
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

  remove(project) {
    this.projects = this.projects.filter((el) => el.id !== project.id);
  }

  setClickedProject(project) {
    this.clicked = project;
  }

  getSelectedProject() {
    return this.clicked;
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
    this.id = nanoid();
    this.finished = false;
  }

  setTodoTitle(title) {
    this.title = title;
  }

  setTodoDate(date) {
    this.date = date;
  }

  invertFinished() {
    this.finished = !this.finished;
  }

  getFinished() {
    return this.finished;
  }

  getTodoTitle() {
    return this.title;
  }
  getTodoDate() {
    return this.date;
  }
}
