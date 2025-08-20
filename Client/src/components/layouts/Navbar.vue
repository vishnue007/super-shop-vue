<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-xl font-bold text-gray-800">
            My App
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <template v-if="isAuthenticated">
            <span class="text-gray-600">Welcome, {{ currentUser?.name }}</span>
            <button
              @click="handleLogout"
              :disabled="isLoading"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 disabled:opacity-50"
            >
              <span v-if="isLoading">Logging out...</span>
              <span v-else>Logout</span>
            </button>
          </template>
          
          <template v-else>
            <router-link
              to="/login"
              class="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Register
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

// Reactive state from store
const isAuthenticated = computed(() => authStore.isAuthenticated)
const currentUser = computed(() => authStore.currentUser)
const isLoading = computed(() => authStore.isLoading)

const handleLogout = async () => {
  await authStore.logout()
}
</script>
