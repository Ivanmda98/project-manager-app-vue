import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import type { Project } from '../interfaces/projects.interface';
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const createNewProject = (projectName: string) => {
    if (projectName.length === 0) return;

    projects.value.push({
      id: uuidV4(),
      name: projectName,
      task: [],
    });
  };

  return {
    projectList: computed(() => [...projects.value] as const),
    noProjects: computed(() => projects.value.length === 0),
    createNewProject,
  };
});
