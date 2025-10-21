<script setup>
import { mdiLogout } from '@mdi/js'
import { computed } from 'vue'
import AsideMenuList from '@/components/AsideMenuList.vue'
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

defineProps({
  menu: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['menu-click', 'aside-lg-close-click'])
const authStore = useAuthStore()
const router = useRouter()

const logoutItem = computed(() => ({
  to: '/login',
  label: 'Logout',
  icon: mdiLogout,
  color: 'info',
  isLogout: true,
}))

const menuClick = (event, item) => {
  if (item.isLogout) {
    if (confirm('Apakah Anda yakin ingin logout?')) {
      authStore.logout()
      router.push('/login')
    }
    return
  } else {
    emit('menu-click', event, item)
  }
}

/* const asideLgCloseClick = (event) => {
  emit('aside-lg-close-click', event)
} */
</script>

<template>
  <aside
    id="aside"
    class="5xl:py-2 5xl:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden"
  >
    <div class="aside 5xl:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900">
      <div class="aside-brand flex flex-row h-14 items-center justify-between dark:bg-slate-900">
        <div class="text-center flex-1 lg:text-center lg:pl-0">
          <a href="/">
            <b class="font-black font-poppins">AQMS Dashboard</b>
          </a>
        </div>
        <!-- <button class="hidden lg:inline-block xl:hidden p-3" @click.prevent="asideLgCloseClick">
          <BaseIcon :path="mdiClose" />
        </button> -->
      </div>
      <div
        class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate]"
      >
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>

      <ul class="font-poppins">
        <AsideMenuItem :item="logoutItem" @menu-click="menuClick" />
      </ul>
    </div>
  </aside>
</template>
