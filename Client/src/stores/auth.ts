import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, logout as logoutApi, register as registerApi, User } from '../utils/auth'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)
  const authError = computed(() => error.value)

  // Actions
  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null

      const result = await loginApi(email, password)
      
      if (result.success) {
        user.value = result.data.user
        token.value = result.data.token
        
        // Store in localStorage
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('user', JSON.stringify(result.data.user))
        
        // Redirect to home
        router.push('/')
        return { success: true }
      } else {
        error.value = result.message
        return { success: false, message: result.message }
      }
    } catch (err) {
      error.value = 'An unexpected error occurred'
      return { success: false, message: 'An unexpected error occurred' }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null

      const result = await registerApi(name, email, password)
      
      if (result.success) {
        // Don't automatically log in after registration
        // User needs to login separately
        return { success: true, message: 'Registration successful! Please login.' }
      } else {
        error.value = result.message
        return { success: false, message: result.message }
      }
    } catch (err) {
      error.value = 'An unexpected error occurred'
      return { success: false, message: 'An unexpected error occurred' }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      isLoading.value = true
      error.value = null

      // Call logout API
      await logoutApi()
      
      // Clear state
      user.value = null
      token.value = null
      
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Redirect to login
      router.push('/login')
      
      return { success: true }
    } catch (err) {
      error.value = 'Logout error'
      // Still clear state even if API fails
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
      return { success: true }
    } finally {
      isLoading.value = false
    }
  }

  const checkAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      try {
        // Basic token validation (you might want to add JWT expiration check)
        if (storedToken.length < 10) { // Basic validation
          throw new Error('Invalid token format')
        }
        
        token.value = storedToken
        user.value = JSON.parse(storedUser)
        return true
      } catch (err) {
        // Invalid stored data, clear it
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        user.value = null
        token.value = null
        return false
      }
    }
    return false
  }

  const clearError = () => {
    error.value = null
  }

  const updateUser = (updatedUser: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...updatedUser }
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,
    
    // Getters
    isAuthenticated,
    currentUser,
    authError,
    
    // Actions
    login,
    register,
    logout,
    checkAuth,
    clearError,
    updateUser
  }
})
