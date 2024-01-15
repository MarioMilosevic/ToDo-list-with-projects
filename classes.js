"use strict";


export class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.id = Math.random() * 100000
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
}
