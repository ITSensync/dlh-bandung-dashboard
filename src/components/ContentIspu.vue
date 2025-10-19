<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import IspuChart from './Charts/IspuChart.vue'
import { useMainStore } from '@/stores/main'

let intervalId = null
const mainStore = useMainStore()
const bars = ref([])
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
})

const fetchData = async () => {
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
})
</script>

<template>
  <div class="md:col-span-2 xl:col-span-1 min-h-full bg-slate-900/70 rounded-xl flex flex-col items-center gap-4 p-4">
    <p class="font-bold font-poppins text-center">Indeks Standar Pencemaran Udara</p>
    <div class="w-full h-full flex gap-3 sm:gap-4">
      <IspuChart :dataIspu="bars" />
    </div>
  </div>
</template>
