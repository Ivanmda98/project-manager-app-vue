import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { Project } from '../interfaces/projects.interface';
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  const projects = useLocalStorage<Project[]>('projects', []);

  const createNewProject = (projectName: string) => {
    if (projectName.length === 0) return;

    projects.value.push({
      id: uuidV4(),
      name: projectName,
      tasks: [],
    });
  };

  const addNewTask = (task: string, projectId: string) => {
    if (task.trim().length === 0) return;

    const projectToAddTask = projects.value.find((project) => project.id === projectId);
    projectToAddTask?.tasks.push({
      id: uuidV4(),
      name: task,
    });
  };

  const changeTaskStatus = (projectId: string, taskId: string) => {
    const projectToAddTask = projects.value.find((project) => project.id === projectId);
    if (!projectToAddTask) return;

    const task = projectToAddTask?.tasks.find((task) => task.id === taskId);
    if (!task) return;

    task.completeAt = task.completeAt ? undefined : new Date();
  };

  return {
    projectList: computed(() => projects.value),
    noProjects: computed(() => projects.value.length === 0),

    projectsCompletion: computed(() => {
      return projects.value.map((project) => {
        const total = project.tasks.length;
        const completed = project.tasks.filter((t) => t.completeAt).length;
        const completion = total === 0 ? 0 : (completed / total) * 100;

        return {
          id: project.id,
          name: project.name,
          taskCount: total,
          completion: Math.round(completion),
        };
      });
    }),

    createNewProject,
    addNewTask,
    changeTaskStatus,
  };
});
