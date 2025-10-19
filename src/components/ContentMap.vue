<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import MapVue from './MapVue.vue'
import { useMainStore } from '@/stores/main'

let intervalId = null
const mainStore = useMainStore()
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
const maxIspu = ref({ param: '-', value: 0 })

const fetchData = async () => {
  await mainStore.fetchIspuLatest()
  ispuLatestData.value = mainStore.ispuLatest

  if (ispuLatestData.value) {
    maxIspu.value = getMaxIspu(ispuLatestData.value)
  }
}

onMounted(async () => {
  fetchData()

  intervalId = setInterval(() => {
    fetchData()
    // console.log('interval running')
  }, 300000) //5 menit sekali
})

watch([() => mainStore.ispuLatest], ([newIspuLatest]) => {
  if (newIspuLatest) {
    ispuLatestData.value = newIspuLatest
    maxIspu.value = getMaxIspu(newIspuLatest)
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

function getMaxIspu(data) {
  const keys = ['pm25', 'pm10', 'so2', 'no2', 'co', 'o3', 'hc']
  const maxParam = keys.reduce((a, b) => (Number(data[a]) > Number(data[b]) ? a : b))
  return { param: maxParam, value: Number(data[maxParam]) }
}
</script>

<template>
  <div class="bg-slate-900/70 rounded-xl flex flex-col sm:min-h-full">
    <MapVue :name="maxIspu.param" :value="maxIspu.value" />
  </div>
</template>
