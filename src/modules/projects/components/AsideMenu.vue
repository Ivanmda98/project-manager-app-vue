<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4">Projects</h2>
    <p v-if="projectsStore.noProjects" class="text-sm text-gray-500 mx-4">There are no projects</p>
    <ul v-else class="menu w-full">
      <li v-for="project in projectsStore.projectList" :key="project.id">
        <template v-if="project.task.length > 0">
          <details>
            <RouterLink :to="`/project/${project.id}`">
              <summary>{{ project.name }}</summary>
            </RouterLink>
            <ul>
              <li v-for="task in project.task" :key="task.id">
                <RouterLink :to="`project/${project.id}`">
                  {{ task.name }}
                </RouterLink>
              </li>
            </ul>
          </details>
        </template>
        <template v-else>
          <RouterLink :to="`project/${project.id}`">{{ project.name }}</RouterLink>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { useProjectsStore } from '../store/Projects.store';

const projectsStore = useProjectsStore();
</script>

<style scoped></style>
