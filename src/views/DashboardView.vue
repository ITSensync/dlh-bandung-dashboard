<script setup lang="js">
import ContentGas from '@/components/Dashboard/ContentGas.vue'
import ContentIspu from '@/components/Dashboard/ContentIspu.vue'
import { defineAsyncComponent, onMounted, onUnmounted } from 'vue'

const ContentMap = defineAsyncComponent(() => import('@/components/Dashboard/ContentMap.vue'))
// import ContentPartikulat from '@/components/Dashboard/ContentPartikulat.vue'
import ContentUdara from '@/components/Dashboard/ContentUdara.vue'
import ContentWeather from '@/components/Dashboard/ContentWeather.vue'
import NavbarGuest from '@/components/NavbarGuest.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import { useMainStore } from '@/stores/main'
import FooterBar from '@/components/FooterBar.vue'

let intervalId = null
const mainStore = useMainStore()

onMounted(() => {
  mainStore.fetchIspuLatest()
  mainStore.fetch30Minute()

  intervalId = setInterval(() => {
    mainStore.fetchIspuLatest()
    mainStore.fetch30Minute()
  }, 60000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <LayoutGuest>
    <NavbarGuest class="text-slate-100" />
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 p-4 gap-4 text-slate-100"
    >
      <Suspense>
        <template #default>
          <ContentMap />
        </template>
        <template #fallback>
          <div class="flex items-center justify-center bg-slate-800 rounded-xl h-64">
            <p class="text-zinc-300">Memuat peta...</p>
          </div>
        </template>
      </Suspense>
      <ContentUdara />
      <ContentIspu />
    </div>
    <div class="px-4 h-full text-slate-100">
      <div class="flex flex-col justify-center bg-slate-900/70 rounded-xl h-full">
        <p class="font-poppins text-lg 2xl:text-2xl font-semibold text-center mt-2">Konsentrasi</p>
        <div class="border border-zinc-500 mt-4"></div>
        <div class="px-4 h-full">
          <ContentGas />
        </div>
        <!-- <div class="grid xl:grid-cols-2 gap-x-2 xl:gap-x-2 px-4 h-full">
          <ContentPartikulat />
        </div> -->
      </div>
      <div class="flex flex-col justify-center bg-slate-900/70 rounded-xl h-full mt-4">
        <p class="font-poppins text-lg 2xl:text-2xl font-semibold text-center mt-2">Cuaca</p>
        <div class="border border-zinc-500 mt-4"></div>
        <div class="grid xl:grid-cols-2 gap-x-2 xl:gap-x-2 px-4 h-full">
          <ContentWeather class="xl:col-span-2" />
        </div>
      </div>
    </div>
    <FooterBar class="inset-x-0 bottom-0 text-slate-100"> AQMS DLH KOTA BANDUNG </FooterBar>
  </LayoutGuest>
</template>
