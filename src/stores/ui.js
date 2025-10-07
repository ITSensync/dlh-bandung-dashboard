// stores/ui.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isAsideMobileExpanded = ref(false)
  const isAsideLgActive = ref(false)

  return { isAsideMobileExpanded, isAsideLgActive }
})
