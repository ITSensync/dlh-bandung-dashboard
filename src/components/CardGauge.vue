<script setup>
import CardBox from './CardBox.vue'
import GaugeSpeedometer from './Charts/GaugeSpeedometer.vue'

const param = defineProps({
  name: String,
  value: Number,
  unit: String,
})
</script>

<template>
  <CardBox class="h-full w-full" rounded="rounded-lg">
    <div class="flex flex-row items-center justify-center w-full h-full gap-10">
      <GaugeSpeedometer />
      <div class="font-poppins">
        <p class="font-medium text-2xl text-zinc-400">{{ param.name }}</p>
        <p class="font-extrabold text-4xl">{{ param.value }}</p>
        <p class="text-xl">{{ param.unit }}</p>
      </div>
    </div>
  </CardBox>
</template>
