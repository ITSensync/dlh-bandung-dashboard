<script setup>
import { computed } from 'vue'
import CardBox from './CardBox.vue'

const props = defineProps({
  suhu: {
    type: Number,
    default: 0,
  },
  humd: {
    type: Number,
    default: 0,
  },
})

function dewPointMagnus(Tc, rhPercent) {
  // Tc = suhu dalam °C, rhPercent = kelembapan relatif dalam %
  if (rhPercent <= 0) return -Infinity
  const a = 17.27
  const b = 237.7
  const rh = rhPercent / 100.0
  const alpha = (a * Tc) / (b + Tc) + Math.log(rh)
  const td = (b * alpha) / (a - alpha)
  return Number(td.toFixed(0))
}

const dewPoint = computed(() => dewPointMagnus(props.suhu, props.humd))
</script>

<template>
  <CardBox class="">
    <div class="flex flex-col gap-5">
      <p class="font-poppins">Suhu (°C)</p>
      <div class="flex w-full justify-between gap-5 px-4">
        <div class="w-2/3">
          <div
            class="flex flex-col items-center justify-center h-40 w-40 rounded-full dark:bg-blue-950 bg-zinc-100 outline-5 outline-emerald-400"
          >
            <p class="font-poppins font-medium text-xl">Current</p>
            <p class="font-poppins font-bold text-5xl text-emerald-400">{{ props.suhu }}°</p>
          </div>
        </div>
        <div class="flex flex-col gap-4 w-1/3">
          <div class="flex flex-col font-poppins">
            <p class="font-medium text-lg text-zinc-400">Titik Embun</p>
            <p class="font-bold text-lg">{{ dewPoint }} °C</p>
          </div>
          <div class="flex flex-col font-poppins">
            <p class="font-medium text-lg text-zinc-400">Kelembapan</p>
            <p class="font-bold text-lg">{{ props.humd }}%</p>
          </div>
        </div>
      </div>
    </div>
  </CardBox>
</template>
