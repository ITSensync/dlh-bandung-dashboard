<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import CardTextGas from './CardTextGas.vue'
import { useMainStore } from '@/stores/main'
import { mdiWeatherDust } from '@mdi/js'

let intervalId = null
const mainStore = useMainStore()
const latestPmData = ref({
  pm10: '0',
  pm25: '0',
  tanggal: '01-01-0000',
  jam: '00:00',
})

const fetchData = async () => {
  await mainStore.fetch30Minute('pm')
  latestPmData.value = mainStore.latestPm
}

onMounted(async () => {
  fetchData()

  intervalId = setInterval(() => {
    fetchData()
    // console.log('interval running')
  }, 300000) //5 menit sekali
})

watch(
  () => mainStore.latestPm,
  (newVal) => {
    latestPmData.value = newVal
  },
)

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="w-full h-full grid grid-cols-2 gap-2 py-4">
    <CardTextGas
      name="PM10"
      :icon="mdiWeatherDust"
      :value="Number(latestPmData?.pm10) || 0"
      unit="µg/m³"
      class_name="text-2xl"
      class_value="text-5xl"
      class_unit="text-xl"
    />
    <CardTextGas
      name="PM2.5"
      :icon="mdiWeatherDust"
      :value="Number(latestPmData?.pm25) || 0"
      unit="µg/m³"
      class_name="text-2xl"
      class_value="text-5xl"
      class_unit="text-xl"
    />
  </div>
</template>
