<script setup>
import { useDarkModeStore } from '@/stores/darkMode'
import { computed, defineAsyncComponent } from 'vue'

const VueSpeedometer = defineAsyncComponent(() => import('vue-speedometer'))

const props = defineProps({
  name: String,
  value: Number,
})

const darkModeStore = useDarkModeStore()
const isDark = computed(() => darkModeStore.isEnabled)

const textColor = computed(() => (isDark.value ? '#ffffff' : '#1e293b'))

const clampedValue = computed(() => {
  if (props.value > maxValue.value) return maxValue.value
  if (props.value < 0) return 0
  return props.value
})

// Gradasi warna dari hijau → kuning → oranye → merah → merah tua
/* const segmentColors = [
  '#00b300', // hijau terang
  '#33cc33',
  '#cccc00', // kuning
  '#ffb300', // oranye muda
  '#ff6600', // oranye
  '#cc0000', // merah tua
  '#990000', // merah gelap
  '#660000', // maroon tua
] */

const maxValue = computed(() => {
  switch (true) {
    case props.name == 'PM10':
      return 500
    case props.name == 'PM2.5':
      return 300
    case props.name === 'HC':
      return 648
    case props.name === 'NO<sub>2</sub>':
      return 3000
    case props.name === 'O<sub>3</sub>':
      return 1000
    case props.name === 'CO':
      return 45000
    case props.name === 'SO<sub>2</sub>':
      return 1200
    default:
      return 100
  }
})

const segmentStops = computed(() => {
  switch (true) {
    case props.name == 'PM10':
      return [0, 50, 150, 350, 420, 500]
    case props.name == 'PM2.5':
      return [0, 15.5, 55.4, 150.4, 250.4, 300]
    case props.name == 'HC':
      return [0, 45, 100, 215, 432, 648]
    case props.name == 'CO':
      return [0, 4000, 8000, 15000, 30000, 45000]
    case props.name == 'SO<sub>2</sub>':
      return [0, 52, 180, 400, 800, 1200]
    case props.name == 'O<sub>3</sub>':
      return [0, 120, 235, 400, 800, 1000]
    case props.name == 'NO<sub>2</sub>':
      return [0, 160, 400, 1130, 2260, 3000]
    default:
      return [0, 20, 40, 60, 80, 100]
  }
})

{
  /* <VueSpeedometer
      :width="300"
      :height="200"
      :needle-height-ratio="0.7"
      :max-segment-labels="6"
      :ring-width="35"
      :custom-segment-stops="
        props.name === 'PM10' ? [0, 50, 150, 350, 420, 500] : [0, 15.5, 55.4, 150.4, 250.4, 300]
      "
      :segment-colors="['limegreen', 'skyblue', 'gold', 'tomato', 'black']"
      :value="props.value"
      :min-value="0"
      :max-value="props.name == 'PM10' ? 500 : 300"
      text-color="#d8dee9"
      current-value-text=""
      :needle-transition-duration="2000"
      needle-transition="easeElastic"
      needle-color="grey"
      class=""
    /> */
}
</script>

<template>
  <div class="flex items-center justify-center w-fit h-full p-0 m-0 overflow-hidden">
    <VueSpeedometer
      :key="isDark"
      :width="300"
      :height="200"
      :needle-height-ratio="0.7"
      :ring-width="35"
      :max-segment-labels="8"
      :custom-segment-stops="segmentStops"
      :segment-colors="['limegreen', 'skyblue', 'gold', 'tomato', 'black']"
      :value="clampedValue"
      :min-value="0"
      :max-value="maxValue"
      :textColor="textColor"
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
