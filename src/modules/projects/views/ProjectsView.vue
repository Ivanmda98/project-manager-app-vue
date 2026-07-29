<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
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
        <tr class="hover:bg-base-300">
          <th>2</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
        </tr>
      </tbody>
    </table>
  </div>
  <InputModal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="onNewValue"
    :modal-config="modalConfig"
  ></InputModal>
  <FabButton @click="modalOpen = true">
    <AddCircle></AddCircle>
  </FabButton>

  <!-- button custom modal -->

  <CustomModal :open="customModalOpen" @close="customModalOpen = false">
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
  <FabButton position="bottom-left" @click="customModalOpen = true">
    <AddCircle></AddCircle>
  </FabButton>
</template>
<script setup lang="ts">
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import { ref } from 'vue';
const modalOpen = ref(false);
const customModalOpen = ref(false);
const modalConfig = {
  modalTitle: 'Create new project',
  modalDescription: 'Write project name',
  modalPlaceHolderInput: 'Project Name',
  modalTextMainButton: 'Create',
  modalTextSecondaryButton: 'Cancel',
};
const onNewValue = (newValue: string) => {
  console.log(newValue);
};
</script>
