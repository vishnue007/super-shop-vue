<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/layouts/Navbar.vue';
import Footer from './components/layouts/Footer.vue';

const route = useRoute();

// Hide navbar on login and register pages
const showNavbar = computed(() => {
  const hideNavbarRoutes = ['/login', '/register'];
  return !hideNavbarRoutes.includes(route.path);
});

</script>

<template>
  <div class="min-h-screen">
    <Navbar v-if="showNavbar" />
    <main>
      <router-view />
    </main>
    <Footer v-if="showNavbar" />
  </div>
</template>

<style scoped></style>
