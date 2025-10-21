import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const username = ref(localStorage.getItem('username') || '');
  const role = ref(localStorage.getItem('role') || '');

  async function login(payload) {
    try {

      const result = await axios.post(`${apiUrl}auth/login.php`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      })

      return result.data

    } catch (error) {
      console.error('LOGIN ERROR', error)
      return { status: 'error', message: 'Login Gagal' }
    }
  }

  function logout() {
    role.value = ''
    username.value = ''
    localStorage.removeItem('role')
    localStorage.removeItem('username')
    localStorage.removeItem('auth-token')
  }

  return {
    username,
    role,
    login,
    logout,
  }
})