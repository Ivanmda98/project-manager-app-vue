<template>
  <section class="flex flex-col w-full">
    <section class="m-3">
      <BreadCrumbs :name="project?.name"></BreadCrumbs>
    </section>
    <section>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Complete</th>
              <th>Task</th>
              <th>Completed on</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in project?.tasks" :key="task.id">
              <th>
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary"
                  :checked="!!task.completeAt"
                  @change="onChangeTaskStatus(task.id)"
                />
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completeAt }}</td>
            </tr>
            <tr>
              <th></th>
              <td colspan="2">
                <div class="w-full flex justify-end">
                  <form
                    class="flex flex-row w-[70%] border-primary border-2 rounded-md"
                    @submit.prevent="onAddNewTask"
                  >
                    <input
                      v-model="inputValue"
                      type="text"
                      class="w-full input input-primary border-transparent focus:outline-none hover:outline-none opacity-60 hover:opacity-100 focus:opcity-100 transition-all"
                      placeholder="New task"
                    />
                    <button
                      class="btn btn-primary w-28 rounded-r-sm rounded-l-none border-none disabled:opacity-80 disabled:bg-primary"
                      :disabled="btnDisabled"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useProjectsStore } from '../store/Projects.store';
import { computed, ref, watch } from 'vue';
import type { Project } from '../interfaces/projects.interface';
import router from '@/router';

interface Props {
  id: string;
}
const props = defineProps<Props>();
const projectStore = useProjectsStore();
const project = ref<Project | undefined>();
const btnDisabled = computed(() => inputValue.value.trim().length === 0);

watch(
  props,
  ({ id }) => {
    project.value = projectStore.projectList.find((project) => project.id === id);
    if (!project.value) {
      router.replace('/');
    }
  },
  {
    immediate: true,
  },
);

const onAddNewTask = () => {
  if (!project.value?.id) return;
  projectStore.addNewTask(inputValue.value, project.value.id);
  inputValue.value = '';
};

const onChangeTaskStatus = (taskId: string) => {
  if (!project.value?.id) return;
  projectStore.changeTaskStatus(project.value.id, taskId);
};
const inputValue = ref('');
</script>

<style scoped></style>
