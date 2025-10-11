<template>
  <div ref="chartDiv" class="w-fit h-fit rounded-full"></div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 80,
  },
})

const chartDiv = ref(null)
const chart = ref(null)
const data = ref(null)

const options = {
  width: 400,
  height: 160,
  min: 0,
  max: 300,
  redFrom: 250,
  redTo: 300,
  yellowFrom: 200,
  yellowTo: 250,
  minorTicks: 5,
  tooltip: { trigger: 'none' },
  enableInteractivity: false,
}

function drawChart() {
  if (typeof window.google === 'undefined' || !chartDiv.value) {
    console.error('Google Charts belum dimuat atau elemen DOM tidak siap.')
    return
  }

  if (!data.value) {
    data.value = new window.google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['mBar', props.value],
    ])
  } else {
    data.value.setValue(0, 1, props.value)
  }

  if (!chart.value) {
    chart.value = new window.google.visualization.Gauge(chartDiv.value)
  }

  chart.value.draw(data.value, options)
}
watch(
  () => [props.value],
  () => {
    drawChart()
  },
  { deep: true },
)

onMounted(() => {
  if (window.google && window.google.charts) {
    window.google.charts.load('current', { packages: ['gauge'] })
    window.google.charts.setOnLoadCallback(drawChart)
  }
})
</script>

<style scoped></style>
