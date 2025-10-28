<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'
import LegendIspu from './LegendIspu.vue'
import IspuChart from '../Charts/IspuChart.vue'

const mainStore = useMainStore()

const ispuLatestData = computed(() => mainStore.ispuLatest)
const bars = computed(() => [
  { label: 'PM10', value: Number(ispuLatestData.value?.pm10) || 0 },
  { label: 'PM2.5', value: Number(ispuLatestData.value?.pm25) || 0 },
  { label: 'SO<sub>2</sub>', value: Number(ispuLatestData.value?.so2) || 0 },
  { label: 'CO', value: Number(ispuLatestData.value?.co) || 0 },
  { label: 'O<sub>3</sub>', value: Number(ispuLatestData.value?.o3) || 0 },
  { label: 'NO<sub>2</sub>', value: Number(ispuLatestData.value?.no2) || 0 },
  { label: 'HC', value: Number(ispuLatestData.value?.hc) || 0 },
])
</script>

<template>
  <div
    class="md:col-span-2 xl:col-span-1 min-h-full bg-slate-900/70 rounded-xl flex flex-col items-center gap-4 pb-4 pt-2"
  >
    <p class="font-poppins text-lg 2xl:text-2xl font-semibold text-center mt-2">
      Indeks Standar Pencemaran Udara (ISPU)
    </p>
    <div class="border border-zinc-500 w-full"></div>
    <div class="w-full h-fit flex gap-3 sm:gap-4 px-2">
      <IspuChart :dataIspu="bars" />
    </div>
    <LegendIspu />
    <div class="w-full h-full flex items-end px-2">
      <p class="text-xs 4xl:text-xl">
        <span class="text-red-700">*</span> Perhitungan berdasarkan Permen LHK No. 14 Tahun 2020
      </p>
    </div>
  </div>
</template>
