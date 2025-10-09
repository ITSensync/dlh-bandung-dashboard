<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import menuAside from '@/menuAside.js'
import menuNavBar from '@/menuNavBar.js'
import { useDarkModeStore } from '@/stores/darkMode.js'
import BaseIcon from '@/components/BaseIcon.vue'
import NavBar from '@/components/NavBar.vue'
import NavBarItemPlain from '@/components/NavBarItemPlain.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import { useTimeStore } from '@/stores/time'
import AuthToken from '@/utils/AuthToken'
import { useUiStore } from '@/stores/ui'

const layoutAsidePadding = '3xl:pl-60'

const darkModeStore = useDarkModeStore()

const router = useRouter()

const ui = useUiStore()
// const isAsideMobileExpanded = ref(false)
// const isAsideLgActive = ref(false)

router.beforeEach(() => {
  // isAsideMobileExpanded.value = false
  // isAsideLgActive.value = false
})

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    darkModeStore.set()
  }

  if (item.isLogout) {
    localStorage.removeItem('auth-token')
  }
}

const timeStore = useTimeStore()
onMounted(() => {
  timeStore.startClock()
})

onMounted(() => {
  const token = AuthToken.validateAuthToken('auth-token')
  if (!token) {
    router.push('/error')
  }
})
</script>

<template>
  <div
    :class="{
      'overflow-hidden lg:overflow-visible': ui.isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 3xl:ml-0': ui.isAsideMobileExpanded }]"
      class="flex flex-col pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[layoutAsidePadding, { 'ml-60 3xl:ml-0': ui.isAsideMobileExpanded }]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex"
          @click.prevent="ui.isAsideMobileExpanded = !ui.isAsideMobileExpanded"
        >
          <BaseIcon :path="ui.isAsideMobileExpanded ? mdiBackburger : mdiForwardburger" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain display="hidden 3xl:flex" @click.prevent="ui.isAsideLgActive = true">
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain use-margin class="p-4 dark:hover:text-white">
          <div class="flex flex-row gap-2 justify-end items-end">
            <p class="text-md font-bold">
              {{ timeStore.date }}
            </p>
            <p>/</p>
            <p class="text-md font-semibold">{{ timeStore.time }}</p>
          </div>
        </NavBarItemPlain>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="ui.isAsideMobileExpanded"
        :is-aside-lg-active="ui.isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="ui.isAsideLgActive = false"
      />
      <div class="flex-1">
        <slot />
      </div>
      <FooterBar class="inset-x-0 bottom-0"> AQMS DLH KOTA BANDUNG </FooterBar>
    </div>
  </div>
</template>
