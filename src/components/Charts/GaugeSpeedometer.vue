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
      return 1000
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
      return 100
  }
})
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
      :segment-colors="segmentColors"
      :value="props.value"
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
