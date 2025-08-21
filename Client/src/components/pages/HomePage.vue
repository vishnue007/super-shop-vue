<template>
  <div class="min-h-[600px] flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-white p-6">
    <h1 class="text-4xl font-extrabold mb-4 drop-shadow-lg">
      Welcome to the Home Page 🎉
    </h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logout() {
      // Remove token from localStorage (or sessionStorage)
      localStorage.removeItem("token");

      // Redirect to login
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
/* Optional: extra beauty */
</style>
