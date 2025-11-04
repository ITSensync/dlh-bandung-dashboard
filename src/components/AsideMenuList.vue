<script setup>
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  isDropdownList: Boolean,
  menu: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['menu-click'])

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

const authStore = useAuthStore()
const { role } = storeToRefs(authStore)

const filteredMenu = ref([])

function updateMenu() {
  if (role.value === 'sensync') {
    filteredMenu.value = props.menu
  } else if (role.value === 'admin') {
    filteredMenu.value = props.menu.filter((item) => item.label !== 'Laporan MT')
  } else if (role.value === 'spv') {
    filteredMenu.value = props.menu.filter(
      (item) => item.label !== 'Laporan' && item.label !== 'Laporan MT',
    )
  } else {
    filteredMenu.value = []
  }
}

onMounted(() => {
  updateMenu()
})

watch(role, () => {
  updateMenu()
})
</script>

<template>
  <ul>
    <AsideMenuItem
      v-for="(item, index) in filteredMenu"
      :key="index"
      :item="item"
      :is-dropdown-list="isDropdownList"
      @menu-click="menuClick"
    />
  </ul>
</template>
