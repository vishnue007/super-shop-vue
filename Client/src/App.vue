<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import Navbar from './components/layouts/Navbar.vue';

const authStore = useAuthStore();

onMounted(() => {
  // Check if user is already authenticated (e.g., page refresh)
  authStore.checkAuth();
});
</script>

<template>
  <div class="min-h-screen">
    <Navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
