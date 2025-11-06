<script setup>
import { useMainStore } from '@/stores/main'
import { computed } from 'vue'
import CardTextGas from '../Admin/CardTextGas.vue'

// let intervalId = null
const mainStore = useMainStore()
const latestGasData = computed(() => {
  const firstData = mainStore.listDaily30Minute?.[0] || {}
  return {
    pm10: firstData.pm10 ?? '-',
    pm25: firstData.pm25 ?? '-',
    tanggal: firstData.tanggal ?? '01-01-0001',
    jam: firstData.jam ?? '00:00',
    hc: firstData.hc ?? '-',
    co: firstData.co ?? '-',
    o3: firstData.o3 ?? '-',
    no2: firstData.no2 ?? '-',
    so2: firstData.so2 ?? '-',
  }
})
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-7 gap-2 py-4">
    <CardTextGas
      name="PM10"
      :value="latestGasData?.pm10 || '-'"
      unit="µg/m³"
    />
    <CardTextGas
      name="PM2.5"
      :value="latestGasData?.pm25 || '-'"
      unit="µg/m³"
    />
    <CardTextGas
      name="HC"
      :value="latestGasData?.hc"
      unit="µg/m³"
      class="col-span-2 sm:col-span-1"
    />
    <CardTextGas
      name="CO"
      :value="latestGasData?.co"
      unit="µg/m³"
      class="col-span-2 sm:col-span-1"
    />
    <CardTextGas
      name="O<sub>3</sub>"
      :value="latestGasData?.o3"
      unit="µg/m³"
      class="col-span-2 sm:col-span-1"
    />
    <CardTextGas
      name="SO<sub>2</sub>"
      :value="latestGasData?.so2"
      unit="µg/m³"
      class="col-span-2 sm:col-span-1"
    />
    <CardTextGas
      name="NO<sub>2</sub>"
      :value="latestGasData?.no2"
      unit="µg/m³"
      class="col-span-2 sm:col-span-1"
    />
  </div>
</template>
