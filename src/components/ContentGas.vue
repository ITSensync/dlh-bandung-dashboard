<script setup>
import { useMainStore } from '@/stores/main'
import CardTextGas from './CardTextGas.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'

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
  <div class="w-[13vw] h-full bg-dlh_blue rounded-xl flex flex-col pt-2 pb-4">
    <p class="font-poppins text-lg font-semibold text-center mt-2">Gas</p>
    <div class="border border-zinc-500 mt-4"></div>

    <!-- CARD GAS -->
    <div class="grid grid-rows-5 px-4 mt-4 gap-2">
      <CardTextGas name="HC" :value="Number(latestGasData?.hc)" unit="µg/m³" />
      <CardTextGas name="CO" :value="Number(latestGasData?.co)" unit="µg/m³" />
      <CardTextGas name="O3" :value="Number(latestGasData?.o3)" unit="µg/m³" />
      <CardTextGas name="SO2" :value="Number(latestGasData?.so2)" unit="µg/m³" />
      <CardTextGas name="NO2" :value="Number(latestGasData?.no2)" unit="µg/m³" />
    </div>
  </div>
</template>
