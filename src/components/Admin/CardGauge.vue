<script setup>
import { defineAsyncComponent } from 'vue'
import CardBox from './CardBox.vue'
const GaugeSpeedometer = defineAsyncComponent(() => import('./Charts/GaugeSpeedometer.vue'))

const param = defineProps({
  name: String,
  value: Number,
  unit: String,
  role: String,
})
</script>

<template>
  <CardBox class="h-full w-full" rounded="rounded-lg">
    <div class="flex flex-col sm:flex-row items-center justify-center w-full h-full sm:gap-10">
      <GaugeSpeedometer :name="param.name" :value="param.value" v-if="role === 'admin'" />
      <div
        class="font-poppins"
        :class="role === 'spv' ? 'flex flex-col justify-center items-center' : ''"
      >
        <p class="font-medium text-2xl text-zinc-400">{{ param.name }}</p>
        <p class="font-extrabold text-4xl">{{ param.value }}</p>
        <p class="text-xl">{{ param.unit }}</p>
      </div>
    </div>
  </CardBox>
</template>
