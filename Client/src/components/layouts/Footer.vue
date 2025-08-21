<template>
  <footer class="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Top Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <h2 class="text-2xl font-bold mb-2">MyBrand</h2>
          <p class="text-sm opacity-80">
            Building modern web experiences with Vue & Tailwind 🚀
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-lg font-semibold mb-3">Quick Links</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="hover:underline">Home</router-link></li>
            <li><router-link to="/about" class="hover:underline">About</router-link></li>
            <li><router-link to="/service" class="hover:underline">Services</router-link></li>
            <li><router-link to="/contact" class="hover:underline">Contact</router-link></li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h3 class="text-lg font-semibold mb-3">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" class="hover:text-gray-200">
              <i class="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" class="hover:text-gray-200">
              <i class="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" class="hover:text-gray-200">
              <i class="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" class="hover:text-gray-200">
              <i class="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-white/30 my-6"></div>

      <!-- Bottom -->
      <div class="text-center text-sm opacity-80">
        © {{ new Date().getFullYear() }} MyBrand. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Nothing needed here unless you want dynamic data
</script>

<style scoped>
/* You can use Font Awesome or Heroicons for social icons */
</style>
