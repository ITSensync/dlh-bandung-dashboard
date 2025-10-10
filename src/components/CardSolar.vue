<script setup>
import { ref } from 'vue'
import CardBox from './CardBox.vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([20])

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
        background: '#1D293D',
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
          offsetY: 15,
          color: '#888',
          fontSize: '40px',
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
      <div class="flex flex-row justify-between items-center gap-5 px-4">
        <div class="2/3">
          <VueApexCharts
            type="radialBar"
            height="200"
            width="150"
            class="h-fit"
            :options="chartOptions"
            :series="series"
          />
        </div>
        <div class="flex flex-col w-1/3 font-poppins">
          <p class="font-medium text-lg text-zinc-400">Rasio Saat ini</p>
          <p class="font-bold text-lg">40 watt/m2</p>
        </div>
      </div>
    </div>
  </CardBox>
</template>
