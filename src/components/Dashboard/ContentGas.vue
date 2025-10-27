<script setup>
import { useMainStore } from '@/stores/main'
import CardTextGas from './CardTextGas.vue'
import { computed } from 'vue'
import { mdiCar, mdiFactory, mdiFlaskOutline, mdiMolecule, mdiMoleculeCo } from '@mdi/js'

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
  <div class="grid grid-cols-3 gap-2 py-4">
    <CardTextGas
      name="HC"
      :icon="mdiFlaskOutline"
      :value="latestGasData?.hc"
      unit="µg/m³"
    />
    <CardTextGas name="CO" :icon="mdiMoleculeCo" :value="latestGasData?.co" unit="µg/m³" />
    <CardTextGas
      name="O<sub>3</sub>"
      :icon="mdiMolecule"
      :value="latestGasData?.o3"
      unit="µg/m³"
    />
    <div class="flex flex-row gap-2 col-span-3">
      <CardTextGas
        name="SO<sub>2</sub>"
        :icon="mdiFactory"
        :value="latestGasData?.so2"
        unit="µg/m³"
      />
      <CardTextGas
        name="NO<sub>2</sub>"
        :icon="mdiCar"
        :value="latestGasData?.no2"
        unit="µg/m³"
      />
    </div>
  </div>
</template>
