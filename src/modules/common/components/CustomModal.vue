<template>
  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle" :open="open">
    <div class="modal-box">
      <header class="border-b border-blue-500">
        <slot name="modalHeader"></slot>
      </header>
      <main class="my-5">
        <slot name="modalMain"></slot>
      </main>
      <footer class="my-5 flex justify-end gap-1 mt-5">
        <slot name="modalFooter"></slot>
      </footer>
    </div>
  </dialog>
  <div class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50"></div>
</template>

<script lang="ts" setup>
interface Props {
  open: boolean;
}

defineProps<Props>();
</script>
