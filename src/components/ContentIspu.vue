<script setup>
import { computed } from 'vue'
import IspuChart from './Charts/IspuChart.vue'
import { useMainStore } from '@/stores/main'
import LegendIspu from './LegendIspu.vue'

// let intervalId = null
const mainStore = useMainStore()
/* const bars = ref([])
const ispuLatestData = ref({
  pm25: '0',
  pm10: '0',
  hc: '0',
  co: '0',
  o3: '0',
  no2: '0',
  so2: '0',
  ket: '-',
  status: '-',
  tanggal: '01-01-0001',
  jam: '00:00:00',
}) */

const ispuLatestData = computed(() => mainStore.ispuLatest)
const bars = computed(() => [
  { label: 'PM10', value: Number(ispuLatestData.value?.pm10) || 0 },
  { label: 'PM2.5', value: Number(ispuLatestData.value?.pm25) || 0 },
  { label: 'SO2', value: Number(ispuLatestData.value?.so2) || 0 },
  { label: 'CO', value: Number(ispuLatestData.value?.co) || 0 },
  { label: 'O3', value: Number(ispuLatestData.value?.o3) || 0 },
  { label: 'NO2', value: Number(ispuLatestData.value?.no2) || 0 },
  { label: 'HC', value: Number(ispuLatestData.value?.hc) || 0 },
])

/* const fetchData = async () => {
  await mainStore.fetchIspuLatest()
  ispuLatestData.value = mainStore.ispuLatest

  const data = ispuLatestData.value || {}
  bars.value = [
    { label: 'PM10', value: Number(data.pm10) || 0 },
    { label: 'PM2.5', value: Number(data.pm25) || 0 },
    { label: 'SO2', value: Number(data.so2) || 0 },
    { label: 'CO', value: Number(data.co) || 0 },
    { label: 'O3', value: Number(data.o3) || 0 },
    { label: 'NO2', value: Number(data.no2) || 0 },
    { label: 'HC', value: Number(data.hc) || 0 },
  ]
}

onMounted(async () => {
  fetchData()

  intervalId = setInterval(() => {
    fetchData()
    // console.log('interval running')
  }, 300000) //5 menit sekali
})

watch(
  [() => mainStore.ispuLatest, () => mainStore.listIspuPM10, () => mainStore.listIspuPM25],
  ([newIspuLatest]) => {
    if (newIspuLatest) {
      ispuLatestData.value = newIspuLatest
      bars.value = [
        { label: 'PM10', value: Number(newIspuLatest.pm10) || 0 },
        { label: 'PM2.5', value: Number(newIspuLatest.pm25) || 0 },
        { label: 'SO2', value: Number(newIspuLatest.so2) || 0 },
        { label: 'CO', value: Number(newIspuLatest.co) || 0 },
        { label: 'O3', value: Number(newIspuLatest.o3) || 0 },
        { label: 'NO2', value: Number(newIspuLatest.no2) || 0 },
        { label: 'HC', value: Number(newIspuLatest.hc) || 0 },
      ]
    }
  },
)

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
}) */
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
      <p class="text-xs"><span class="text-red-700">*</span> Perhitungan berdasarkan Permen LHK No. 14 Tahun 2020</p>
    </div>
  </div>
</template>
