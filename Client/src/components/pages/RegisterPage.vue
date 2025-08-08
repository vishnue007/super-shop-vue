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

        <button
          type="button"
          class="w-full py-3 rounded-lg bg-white text-purple-600 font-bold hover:bg-purple-100 transition duration-300 shadow-md"
          @click="handleSubmit"
        >
          Sign Up
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
import { reactive } from 'vue'
import router from '../../router'

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleSubmit = async () => {
  if (form.password !== form.confirmPassword) {
    alert("Passwords don't match!")
    return
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password
      })
    })

    const data = await response.json()
    
    if (response.ok) {
      router.push('/login');
    } else {
      alert(data.message || 'Registration failed!')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('An error occurred during registration!')
  }
}
</script>

