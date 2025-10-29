<script setup>
import { defineAsyncComponent } from 'vue'
import CardBox from '../CardBox.vue'
const GaugeSpeedometer = defineAsyncComponent(() => import('../Charts/GaugeSpeedometer.vue'))

const param = defineProps({
  name: String,
  value: Number,
  unit: String,
  role: String,
})
</script>

<template>
  <CardBox class="h-full w-full" rounded="rounded-lg">
    <div class="flex flex-col 2xl:flex-row items-center justify-center w-full h-full 2xl:gap-10">
      <GaugeSpeedometer :name="param.name" :value="param.value" />
      <div class="font-poppins text-center 2xl:text-start" :class="role === 'spv' ? '' : ''">
        <p class="font-medium text-2xl text-zinc-400" v-html="param.name"></p>
        <p class="font-extrabold text-4xl">{{ param.value }}</p>
        <p class="text-xl">{{ param.unit }}</p>
      </div>
    </div>
  </CardBox>
</template>
