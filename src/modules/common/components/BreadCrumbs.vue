<template>
  <div class="breadcrumbs text-sm ml-2">
    <ul>
      <li><RouterLink to="/projects">Home</RouterLink></li>
      <li>
        <span>{{ name ?? '' }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  name: string | undefined;
}

defineProps<Props>();
</script>
