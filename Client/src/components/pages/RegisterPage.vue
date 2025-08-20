<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 px-4 py-6">
    <div class="backdrop-blur-md bg-white/30 border border-white/40 shadow-2xl rounded-xl w-full max-w-xl p-10">
      <h2 class="text-3xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
        Create Your Account
      </h2>

      <form class="space-y-6">
        <div>
          <label class="block text-white font-semibold mb-2">Full Name</label>
          <input
           v-model="form.name"
            type="text"
            placeholder="John Doe"
            class="w-full px-5 py-3 rounded-lg border border-white/40 bg-white/70 text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-white font-semibold mb-2">Email Address</label>
          <input
          v-model="form.email"
            type="email"
            placeholder="john@example.com"
            class="w-full px-5 py-3 rounded-lg border border-white/40 bg-white/70 text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-white font-semibold mb-2">Password</label>
          <input
           v-model="form.password"
            type="password"
            placeholder="••••••••"
            class="w-full px-5 py-3 rounded-lg border border-white/40 bg-white/70 text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-white font-semibold mb-2">Confirm Password</label>
          <input
           v-model="form.confirmPassword"
            type="password"
            placeholder="••••••••"
            class="w-full px-5 py-3 rounded-lg border border-white/40 bg-white/70 text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {{ successMessage }}
        </div>

        <button
          type="button"
          :disabled="isLoading"
          class="w-full py-3 rounded-lg bg-white text-purple-600 font-bold hover:bg-purple-100 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          @click="handleSubmit"
        >
          <span v-if="isLoading">Creating Account...</span>
          <span v-else>Sign Up</span>
        </button>

        <p class="text-white text-sm text-center mt-4">
          Already have an account?
          <router-link to="/login" class="underline font-medium hover:text-white">Login here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import router from '../../router'

const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// Reactive state from store
const isLoading = computed(() => authStore.isLoading)
const error = computed(() => authStore.authError)
const successMessage = ref('')

const handleSubmit = async () => {
  if (form.password !== form.confirmPassword) {
    alert("Passwords don't match!")
    return
  }

  if (!form.name || !form.email || !form.password) {
    alert('Please fill in all fields')
    return
  }

  const result = await authStore.register(form.name, form.email, form.password)
  
  if (result.success) {
    successMessage.value = result.message
    // Clear form
    form.name = ''
    form.email = ''
    form.password = ''
    form.confirmPassword = ''
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } else {
    // Error is already set in the store
    setTimeout(() => authStore.clearError(), 5000) // Clear error after 5 seconds
  }
}

// Clear error when component mounts
onMounted(() => {
  authStore.clearError()
})
</script>

