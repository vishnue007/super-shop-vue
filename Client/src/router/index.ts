import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import HomePage from '../components/pages/HomePage.vue';
import LoginView from '../components/pages/LoginView.vue';
import RegisterPage from '../components/pages/RegisterPage.vue';
import AboutPage from '../components/pages/AboutPage.vue';
import ContactPage from '../components/pages/ContactPage.vue';
import Servicepage from '../components/pages/Servicepage.vue';

const routes = [
  { 
    path: '/', 
    component: HomePage,
    meta: { requiresAuth: true }
  },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterPage },
  { path: '/service', component: Servicepage },
  { path: '/contact', component: ContactPage },
  { path: '/about', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Try to restore auth state from localStorage
    if (authStore.checkAuth()) {
      next()
    } else {
      // Still not authenticated, redirect to login
      next('/login')
    }
  } else {
    next()
  }
})

export default router;