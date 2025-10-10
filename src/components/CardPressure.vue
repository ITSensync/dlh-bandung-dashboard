<script setup>
import CardBox from './CardBox.vue'
// import { ref } from 'vue'
import GaugeChart from './Charts/GaugeChart.vue'

/* const series = ref([67])

const chartOptions = ref({
  chart: {
    height: 150,
    type: 'radialBar',
    offsetY: -10,
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      dataLabels: {
        name: {
          fontSize: '16px',
          color: undefined,
          offsetY: 0,
        },
        value: {
          offsetY: 0,
          fontSize: '22px',
          color: undefined,
          formatter: function () {
            return ''
          },
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      shadeIntensity: 0.15,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91],
    },
  },
  stroke: {
    dashArray: 4,
  },
  labels: [''],
}) */
</script>

<template>
  <CardBox class="">
    <div class="flex flex-col gap-5">
      <p class="font-poppins">Tekanan</p>
      <div class="flex w-full items-center justify-center gap-5 px-4">
        <div class="w-2/3">
          <!--           <VueApexCharts
            type="radialBar"
            height="250"
            width="200"
            :options="chartOptions"
            :series="series"
          /> -->
          <GaugeChart />
        </div>
        <div class="flex flex-col font-poppins w-1/3">
          <p class="font-medium text-lg text-zinc-400">Nilai Saat ini</p>
          <p class="font-bold text-lg">67 mBar</p>
        </div>
      </div>
    </div>
  </CardBox>
</template>
