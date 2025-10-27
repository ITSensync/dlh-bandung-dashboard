<script setup>
import { computed } from 'vue'
import CardTextGas from './CardTextGas.vue'
import { useMainStore } from '@/stores/main'
import { mdiWeatherDust } from '@mdi/js'

// let intervalId = null
const mainStore = useMainStore()

const latestPmData = computed(() => {
  const firstData = mainStore.listDaily30Minute?.[0] || {}
  return {
    pm10: firstData.pm10 ?? "-",
    pm25: firstData.pm25 ?? "-",
    tanggal: firstData.tanggal ?? "01-01-0001",
    jam: firstData.jam ?? "00:00",
  }
})


</script>

<template>
  <div class="w-full h-full grid grid-cols-2 gap-2 py-4 xl:pt-4">
    <CardTextGas
      name="PM10"
      :icon="mdiWeatherDust"
      :value="latestPmData?.pm10 || '-'"
      unit="µg/m³"
      class_name="text-2xl"
      class_value="text-5xl"
      class_unit="text-xl"
    />
    <CardTextGas
      name="PM2.5"
      :icon="mdiWeatherDust"
      :value="latestPmData?.pm25 || '-'"
      unit="µg/m³"
      class_name="text-2xl"
      class_value="text-5xl"
      class_unit="text-xl"
    />
  </div>
</template>
