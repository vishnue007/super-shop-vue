<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-sky-500 to-blue-400 px-4 py-6">
    <div class="backdrop-blur-md bg-white/30 border border-white/40 shadow-2xl rounded-xl w-full max-w-md p-10">
      <h2 class="text-3xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
        Welcome Back
      </h2>

      <form class="space-y-6">
        <div>
          <label class="block text-white font-semibold mb-2">Email Address</label>
          <input
          v-model="email"
            type="email"
            placeholder="you@example.com"
            class="w-full px-5 py-3 rounded-lg border border-white/40 bg-white/70 text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-white font-semibold mb-2">Password</label>
          <input
          v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-5 py-3 rounded-lg border border-white/40 bg-white/70 text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        <div class="flex justify-between items-center text-sm text-white">
          <label class="flex items-center">
            <input type="checkbox" class="mr-2" v-model="rememberMe" />
            Remember me
          </label>
          <a href="#" class="hover:underline">Forgot password?</a>
        </div>

        <button
          @click.prevent="handleLogin"
          type="button"
          class="w-full py-3 rounded-lg bg-white text-indigo-600 font-bold hover:bg-indigo-100 transition duration-300 shadow-md"
        >
          Log In
        </button>

        <p class="text-white text-sm text-center mt-4">
          Don't have an account?
          <router-link to="/register" class="underline font-medium hover:text-white">Register now</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

function handleLogin() {
 
}
</script>
