<script setup>
import { useMainStore } from '@/stores/main'
import CardTextGas from './CardTextGas.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { mdiCar, mdiFactory, mdiFlaskOutline, mdiMolecule, mdiMoleculeCo } from '@mdi/js'

let intervalId = null
const mainStore = useMainStore()
const latestGasData = ref({
  hc: '0',
  co: '0',
  o3: '0',
  no2: '0',
  so2: '0',
  tanggal: '01-01-0000',
  jam: '00:00',
})

const fetchData = async () => {
  await mainStore.fetch30Minute('gas')
  latestGasData.value = mainStore.latestGas
}

onMounted(async () => {
  fetchData()

  intervalId = setInterval(() => {
    fetchData()
    // console.log('interval running')
  }, 300000) //5 menit sekali
})

watch(
  () => mainStore.latestGas,
  (newVal) => {
    latestGasData.value = newVal
  },
)

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="grid grid-cols-3 gap-2 py-4">
    <CardTextGas
      name="HC"
      :icon="mdiFlaskOutline"
      :value="Number(latestGasData?.hc)"
      unit="µg/m³"
    />
    <CardTextGas name="CO" :icon="mdiMoleculeCo" :value="Number(latestGasData?.co)" unit="µg/m³" />
    <CardTextGas
      name="O<sub>3</sub>"
      :icon="mdiMolecule"
      :value="Number(latestGasData?.o3)"
      unit="µg/m³"
    />
    <div class="flex flex-row gap-2 col-span-3">
      <CardTextGas
        name="SO<sub>2</sub>"
        :icon="mdiFactory"
        :value="Number(latestGasData?.so2)"
        unit="µg/m³"
      />
      <CardTextGas
        name="NO<sub>2</sub>"
        :icon="mdiCar"
        :value="Number(latestGasData?.no2)"
        unit="µg/m³"
      />
    </div>
  </div>
</template>
