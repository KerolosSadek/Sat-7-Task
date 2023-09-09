import { defineStore } from 'pinia';

export const favStore = defineStore('favorites', {
  state: () => ({
    favorites: [],
  }),

  actions: {
    isFav(projectId: any) {
      return this.favorites.some((project: { id: any; }) => project.id === projectId);
    },

    // Add Projcet To Fav
    addToFav(project: any) {
      this.favorites.push(project);
    },

    // delete Projcet From Fav
    deleteFromFav(projectId: any) {
      const index = this.favorites.findIndex((project: { id: any; }) => project.id === projectId);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      }
    },
  },
});
