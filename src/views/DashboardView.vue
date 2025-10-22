<script setup lang="js">
// import ContentGas from '@/components/ContentGas.vue'
import ContentGas from '@/components/ContentGas.vue'
import ContentIspu from '@/components/ContentIspu.vue'
import { defineAsyncComponent, onMounted, onUnmounted } from 'vue'

const ContentMap = defineAsyncComponent(() => import('@/components/ContentMap.vue'))
import ContentPartikulat from '@/components/ContentPartikulat.vue'
import ContentUdara from '@/components/ContentUdara.vue'
import ContentWeather from '@/components/ContentWeather.vue'
// import ContentWeather from '@/components/ContentWeather.vue'
import NavbarGuest from '@/components/NavbarGuest.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import { useMainStore } from '@/stores/main'

let intervalId = null
const mainStore = useMainStore()

onMounted(() => {
  mainStore.fetchIspuLatest()
  mainStore.fetch30Minute()

  intervalId = setInterval(() => {
    mainStore.fetchIspuLatest()
    mainStore.fetch30Minute()
    console.log('interval running')
  }, 60000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

/* watch(
  () => mainStore.ispuLatest,
  (newVal, oldVal) => {
    console.log('Data lama:', oldVal)
    console.log('Data baru:', newVal)
  },
  { deep: true } // opsional: supaya nested object ikut terdeteksi
) */
</script>

<template>
  <LayoutGuest>
    <NavbarGuest />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 p-4 gap-4">
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
    <div class="px-4 h-full">
      <div class="flex flex-col justify-center bg-slate-900/70 rounded-xl h-full">
        <p class="font-poppins text-lg 2xl:text-2xl font-semibold text-center mt-2">
          Konsentrasi & Cuaca
        </p>
        <div class="border border-zinc-500 mt-4"></div>
        <div class="grid xl:grid-cols-2 gap-x-2 xl:gap-x-2 px-4 h-full">
          <ContentPartikulat />
          <ContentGas />
          <ContentWeather class="xl:col-span-2"/>
        </div>
      </div>
    </div>
  </LayoutGuest>
</template>
