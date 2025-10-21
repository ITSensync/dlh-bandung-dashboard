<script setup>
import { defineAsyncComponent, ref } from 'vue'
import CardBox from './CardBox.vue'
const VueApexCharts = defineAsyncComponent(() => import('vue3-apexcharts'))

const props = defineProps({
  val: {
    type: Number,
    default: 0,
  },
})

const series = ref([(props.val / 1000) * 100])

const chartOptions = ref({
  chart: {
    height: '100%',
    type: 'radialBar',
    // offsetY: -10,
    // toolbar: { show: true },
    sparkline: { enabled: true },
  },
  plotOptions: {
    radialBar: {
      startAngle: 0,
      endAngle: 360,
      hollow: {
        size: '65%',
        background: '',
      },
      track: {
        background: '#dddddd',
        strokeWidth: '100%',
      },
      dataLabels: {
        show: true,
        name: {
          //   formater: () => 'AVC',
          show: true,
          offsetY: 25,
          color: '#888',
          fontSize: '70px',
        },
        value: {
          formatter: () => '',
          color: '#111',
          fontSize: '22px',
          show: true,
        },
      },
    },
  },
  fill: {
    type: 'solid',
    colors: ['#FF4500'],
  },
  stroke: {
    lineCap: 'round',
  },
  labels: ['☀️'],
})
</script>

<template>
  <CardBox>
    <div class="flex flex-col gap-4">
      <p class="font-poppins">Solar Radiasi</p>
      <div class="flex flex-col sm:flex-row w-full justify-between gap-5 px-4">
        <div class="sm:w-2/3 flex sm:inline justify-center">
          <VueApexCharts
            type="radialBar"
            height="200"
            width="150"
            class="h-fit"
            :options="chartOptions"
            :series="series"
          />
        </div>
        <div class="flex flex-col items-center sm:items-start font-poppins sm:w-1/3">
          <p class="font-medium text-lg text-zinc-400">Rasio Saat ini</p>
          <p class="font-bold text-lg">{{ props.val }} watt/m<sup>2</sup></p>
        </div>
      </div>
    </div>
  </CardBox>
</template>
