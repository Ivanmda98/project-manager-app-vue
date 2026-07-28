<template>
  <div class="flex flex-col">
    <TopMenu></TopMenu>
    <main>
      <AsideMenu></AsideMenu>
      <RouterView></RouterView>
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopMenu from '@/modules/common/components/TopMenu.vue';
import AsideMenu from '../components/AsideMenu.vue';
</script>
