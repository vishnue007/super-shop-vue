import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/pages/HomePage.vue'
import LoginView from '../components/pages/LoginView.vue'
import RegisterPage from '../components/pages/RegisterPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;