<template>
  <div class="min-h-[600px] bg-gradient-to-br from-green-500 via-emerald-400 to-teal-500 flex items-center justify-center px-6 py-12">
    <div class="bg-white/30 backdrop-blur-md rounded-xl shadow-lg w-full max-w-lg p-10">
      <h1 class="text-3xl font-extrabold text-white text-center mb-6">Contact Us</h1>

      <form class="space-y-6">
        <div>
          <label class="block text-white font-semibold mb-2">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            class="w-full px-5 py-3 rounded-lg border border-white/40 bg-white/70 text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-white font-semibold mb-2">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            class="w-full px-5 py-3 rounded-lg border border-white/40 bg-white/70 text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-white font-semibold mb-2">Message</label>
          <textarea
            rows="4"
            placeholder="Your message..."
            class="w-full px-5 py-3 rounded-lg border border-white/40 bg-white/70 text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          ></textarea>
        </div>

        <button
          type="button"
          class="w-full py-3 rounded-lg bg-white text-green-600 font-bold hover:bg-green-100 transition duration-300 shadow-md"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</template>
