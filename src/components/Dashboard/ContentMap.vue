<script setup>
import { computed } from 'vue'
import MapVue from './MapVue.vue'
import { useMainStore } from '@/stores/main'

// let intervalId = null
const mainStore = useMainStore()

const ispuLatestData = computed(() => mainStore.ispuLatest)
const maxIspu = computed(() => {
  const data = ispuLatestData.value
  if (!data) return { param: '-', value: 0 }

  const keys = ['pm25', 'pm10', 'so2', 'no2', 'co', 'o3', 'hc']
  const maxParam = keys.reduce((a, b) => (Number(data[a]) > Number(data[b]) ? a : b))
  return { param: maxParam, value: Number(data[maxParam]) }
})
</script>

<template>
  <div class="bg-slate-900/70 rounded-xl flex flex-col sm:min-h-full">
    <MapVue :name="maxIspu.param" :value="maxIspu.value" />
  </div>
</template>
