<script setup>
import { computed } from 'vue'
import CardBox from '../CardBox.vue'
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()
const ispuLatestData = computed(() => mainStore.ispuLatest || {})

const maxIspu = computed(() => {
  const data = ispuLatestData.value
  if (!data) return { param: [], value: 0 }

  const keys = ['pm25', 'pm10', 'so2', 'no2', 'co', 'o3', 'hc']

  const values = keys.map((k) => Number(data[k] || 0))
  const maxValue = Math.max(...values)

  const maxParams = keys.filter((k) => Number(data[k]) === maxValue)

  const labelMap = {
    pm25: 'PM2.5',
    pm10: 'PM10',
    so2: 'SO₂',
    no2: 'NO₂',
    co: 'CO',
    o3: 'O₃',
    hc: 'HC',
  }

  const displayParams = maxParams.map((k) => labelMap[k] || k.toUpperCase())

  return { param: displayParams, value: maxValue }
})

function generateColorIspu(value) {
  switch (true) {
    case value >= 0 && value <= 50:
      return 'bg-emerald-400'
    case value > 50 && value <= 100:
      return 'bg-blue-400'
    case value > 100 && value <= 200:
      return 'bg-amber-400'
    case value > 200 && value <= 300:
      return 'bg-red-400'
    case value > 300:
      return 'bg-zinc-900'
    default:
      return 'bg-zinc-400'
  }
}
</script>

<template>
  <CardBox>
    <div class="flex flex-row gap-2 h-full items-center">
      <div class="w-1/2 items-end py-5 flex justify-center">
        <div
          class="rounded-full w-30 h-30 sm:h-40 sm:w-40 md:w-40 md:h-40 lg:w-[20vw] lg:h-[20vw] xl:w-40 xl:h-40 2xl:w-50 2xl:h-50 4xl:w-70 4xl:h-70 flex justify-center items-center"
          :class="generateColorIspu(maxIspu.value)"
        >
          <p
            class="font-poppins font-extrabold text-5xl sm:text-6xl md:text-6xl xl:text-5xl 2xl:text-7xl 3xl:text-7xl 4xl:text-8xl text-center text-shadow-lg"
          >
            {{ maxIspu.value }}
            <!-- 10 -->
          </p>
        </div>
      </div>

      <div class="w-1/2 flex flex-col items-start justify-center gap-2 p-2">
        <p
          class="font-poppins font-bold text-sm sm:text-3xl md:text-2xl xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-5xl text-zinc-400"
        >
          Parameter Tertinggi
        </p>
        <p
          class="font-poppins font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl"
        >
          {{ maxIspu.param.join(', ') }}
          <!-- HC -->
        </p>
        <p
          class="font-poppins font-normal text-center text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-5xl"
        >
          {{ ispuLatestData?.status }}
        </p>
      </div>
    </div>
  </CardBox>
</template>
