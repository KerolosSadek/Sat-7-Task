import { defineStore } from 'pinia';

export const authStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    authToken: null, 
    user: null, 
  }),
  actions: {

    handleSetToken(token: any) {
      this.authToken = token;
      this.isAuthenticated = true
      localStorage.setItem('authToken', token); 
      localStorage.setItem('isAuthenticated', this.isAuthenticated);
    },

    handleAddUser(user: any) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
  },
});
