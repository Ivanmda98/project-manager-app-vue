<template>
  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ modalConfig.modalTitle }}</h3>
      <p class="py-4">{{ modalConfig.modalDescription }}</p>
      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            ref="inputRef"
            type="text"
            :placeholder="`${modalConfig.modalPlaceHolderInput}`"
            class="input input-primary w-full flex-1"
            v-model="inputValue"
          />
          <div class="flex justify-end gap-1 mt-5">
            <button type="button" @click="onCloseModal" class="btn">
              {{ modalConfig.modalTextSecondaryButton }}
            </button>
            <button type="submit" class="btn btn-primary">
              {{ modalConfig.modalTextMainButton }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
  <div class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50"></div>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';

interface Props {
  open: boolean;
  modalConfig?: {
    modalTitle: string;
    modalDescription: string;
    modalPlaceHolderInput: string;
    modalTextMainButton: string;
    modalTextSecondaryButton: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  modalConfig: () => ({
    modalTitle: 'Hello!',
    modalDescription: 'Press ESC key or click the button below to close',
    modalPlaceHolderInput: 'Project Name',
    modalTextMainButton: 'Accept',
    modalTextSecondaryButton: 'Close',
  }),
});

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const emits = defineEmits<{
  close: [void];
  value: [text: string];
}>();

watch(props, ({ open }) => {
  if (open) {
    nextTick(() => inputRef.value?.focus());
  }
});

const submitValue = () => {
  if (!inputValue.value.trim()) {
    inputRef.value?.focus();
    return;
  }
  emits('value', inputValue.value.trim());
  emits('close');
  inputValue.value = '';
};

const onCloseModal = () => {
  emits('close');
  inputValue.value = '';
};
</script>
