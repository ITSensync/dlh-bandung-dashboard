<script setup>
import { computed, defineAsyncComponent } from 'vue'

const VueSpeedometer = defineAsyncComponent(() => import('vue-speedometer'))

const props = defineProps({
  name: String,
  value: Number,
})

// Buat gradasi dinamis
/* const segmentStops = computed(() => {
  if (props.name === 'PM10') {
    // Rentang 0–500
    return [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500]
  } else {
    // Rentang 0–300 (misal PM2.5)
    return [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300]
  }
}) */

// Gradasi warna dari hijau → kuning → oranye → merah → merah tua
const segmentColors = [
  '#00b300', // hijau terang
  '#33cc33',
  '#cccc00', // kuning
  '#ffb300', // oranye muda
  '#ff6600', // oranye
  '#cc0000', // merah tua
  '#990000', // merah gelap
  '#660000', // maroon tua
]

const maxValue = computed(() => {
  switch (true) {
    case props.name.includes('PM'):
      return 1000;
    case props.name === 'HC':
      return 648
    case props.name === 'NO2':
      return 3000
    case props.name === 'O3':
      return 1000
    case props.name === 'CO':
      return 45000
    case props.name === 'SO2':
      return 1200
    default:
      return 100;
  }
})
</script>

<template>
  <div class="flex items-center justify-center w-fit h-full p-0 m-0 overflow-hidden">
    <VueSpeedometer
      :width="300"
      :height="200"
      :needle-height-ratio="0.7"
      :ring-width="35"
      :max-segment-labels="8"
      :segment-colors="segmentColors"
      :value="props.value"
      :min-value="0"
      :max-value="maxValue"
      text-color="#d8dee9"
      current-value-text="Konsentrasi"
      :needle-transition-duration="2000"
      needle-transition="easeElastic"
      needle-color="grey"
    />
  </div>
</template>

<style scoped>
/* pastikan SVG-nya benar-benar menempel penuh */
div svg {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
