<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  fetch('http://localhost:5000/api/hello')
    .then(res => res.json())
    .then(data => console.log(data));
});
</script>

<template>
  <div class="min-h-screen">
    <router-view />
  </div>
</template>

<style scoped></style>
