<script setup>
import CardBox from './CardBox.vue'
// import { ref } from 'vue'
import GaugeChart from './Charts/GaugeChart.vue'

const props = defineProps({
  press: {
    type: Number,
    default: 0,
  },
})

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
      <div class="flex flex-col sm:flex-row w-full justify-between gap-5 px-4">
        <div class="sm:w-2/3 flex sm:inline justify-center">
          <!--           <VueApexCharts
            type="radialBar"
            height="250"
            width="200"
            :options="chartOptions"
            :series="series"
          /> -->
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
