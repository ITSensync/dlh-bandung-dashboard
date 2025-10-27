<script setup>
import { defineAsyncComponent } from 'vue';
import CardBox from '../CardBox.vue'
// import { ref } from 'vue'
const GaugeChart = defineAsyncComponent(() => import('../Charts/GaugeChart.vue'))


const props = defineProps({
  press: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <CardBox class="">
    <div class="flex flex-col gap-5">
      <p class="font-poppins">Tekanan</p>
      <div class="flex flex-col sm:flex-row w-full justify-between gap-5 px-4">
        <div class="sm:w-2/3 flex sm:inline justify-center">
          <GaugeChart :value="props.press"/>
        </div>
        <div class="flex flex-col items-center sm:items-start font-poppins sm:w-1/3">
          <p class="font-medium text-lg text-zinc-400">Nilai Saat ini</p>
          <p class="font-bold text-lg">{{ props.press }} mBar</p>
        </div>
      </div>
    </div>
  </CardBox>
</template>
