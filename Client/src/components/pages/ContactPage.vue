<template>
  <div class="min-h-[600px] bg-gradient-to-br from-green-500 via-emerald-400 to-teal-500 flex items-center justify-center px-6 py-12">
    <div class="bg-white/30 backdrop-blur-md rounded-xl shadow-lg w-full max-w-lg p-10">
      <h1 class="text-3xl font-extrabold text-white text-center mb-6">Contact Us</h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-white font-semibold mb-2">Name*</label>
          <input
            v-model="formData.name"
            type="text"
            placeholder="Your Name"
            required
            class="w-full px-5 py-3 rounded-lg border border-white/40 bg-white/70 text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-white font-semibold mb-2">Email*</label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="you@example.com"
            required
            class="w-full px-5 py-3 rounded-lg border border-white/40 bg-white/70 text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-white font-semibold mb-2">Message*</label>
          <textarea
            v-model="formData.desc"
            rows="4"
            placeholder="Your message..."
            required
            class="w-full px-5 py-3 rounded-lg border border-white/40 bg-white/70 text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          ></textarea>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 rounded-lg bg-white text-green-600 font-bold hover:bg-green-100 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">Sending...</span>
          <span v-else>Send Message</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { submitContactForm, type ContactFormData } from '../../utils/contact'

const formData = reactive<ContactFormData>({
  name: '',
  email: '',
  desc: ''
})

const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  // Reset messages
  successMessage.value = ''
  errorMessage.value = ''

  // Basic validation
  if (!formData.name.trim() || !formData.email.trim() || !formData.desc.trim()) {
    errorMessage.value = 'Please fill in all fields'
    return
  }

  if (formData.desc.trim().length < 6) {
    errorMessage.value = 'Message must be at least 6 characters long'
    return
  }

  try {
    isLoading.value = true
    
    const result = await submitContactForm(formData)
    
    if (result.success) {
      successMessage.value = result.message
      // Clear form
      formData.name = ''
      formData.email = ''
      formData.desc = ''
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      errorMessage.value = result.message
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        errorMessage.value = ''
      }, 5000)
    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred. Please try again.'
    
    // Clear error message after 5 seconds
    setTimeout(() => {
      errorMessage.value = ''
    }, 5000)
  } finally {
    isLoading.value = false
  }
}
</script>
