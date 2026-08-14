<template>
  <div class="overflow-x-auto w-full">
    <table v-if="!projectStore.noProjects" class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Projects</th>
          <th>Tasks</th>
          <th>Project progress</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(project, index) in projectStore.projectList"
          :key="project.id"
          class="hover:bg-base-300"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.tasks.length }}</td>
          <td>
            <progress
              class="progress progress-primary w-56"
              :value="
                projectStore.projectsCompletion.find((projectCom) => projectCom.id === project.id)
                  ?.completion
              "
              max="100"
            ></progress>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else role="alert" class="alert alert-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span class="text-lg">There are not projects!</span>
    </div>
  </div>
  <InputModal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="projectStore.createNewProject"
    :modal-config="modalConfig"
  ></InputModal>
  <FabButton @add-new-project="modalOpen = true">
    <AddCircle></AddCircle>
  </FabButton>

  <!-- button custom modal -->

  <!-- <CustomModal :open="customModalOpen">
    <template #modalHeader>
      <h1 class="text-lg font-bold">Create new project</h1>
    </template>
    <template #modalMain>
      <p class="text-sm text-gray-500">Write project name</p>
      <form class="py-5">
        <input
          ref="inputRef"
          type="text"
          placeholder="Project name"
          class="input input-primary w-full flex-1"
        />
      </form>
    </template>
    <template #modalFooter>
      <button type="button" class="btn">Close</button>
      <button type="submit" class="btn btn-primary">Create</button>
    </template>
  </CustomModal>
  <FabButton position="bottom-left" @add-new-project="customModalOpen = true">
    <AddCircle></AddCircle>
  </FabButton> -->
</template>
<script setup lang="ts">
// import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import { ref } from 'vue';
import { useProjectsStore } from '../store/Projects.store.ts';

const projectStore = useProjectsStore();

const modalOpen = ref(false);
// const customModalOpen = ref(false);
const modalConfig = {
  modalTitle: 'Create new project',
  modalDescription: 'Write project name',
  modalPlaceHolderInput: 'Project Name',
  modalTextMainButton: 'Create',
  modalTextSecondaryButton: 'Cancel',
};
</script>
