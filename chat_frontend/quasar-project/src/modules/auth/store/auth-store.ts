import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || null,
    user: null as { id: string; username: string } | null,
  }),
  
  getters: {
    // This is a quick way to check if someone is logged in!
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    // We call this when the user successfully logs in
    loginSuccess(token: string, userData: { id: string; username: string }) {
      this.token = token;
      this.user = userData;
      localStorage.setItem('access_token', token); // Save to browser memory
    },
    
    // We call this when the user clicks "Logout"
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('access_token'); // Delete from browser memory
      // Note: Routing logic is handled where this action is called
    }
  }
});
