<script setup>
import VueSpeedometer from 'vue-speedometer'
</script>

<template>
  <div class="flex items-center justify-center w-fit h-full p-0 m-0 overflow-hidden">
    <VueSpeedometer
      :width="350"
      :height="250"
      :needle-height-ratio="0.7"
      :max-segment-labels="6"
      :ring-width="35"
      :custom-segment-stops="[0, 50, 150, 350, 420, 500]"
      :segment-colors="['limegreen', 'skyblue', 'gold', 'tomato', 'black']"
      :value="333"
      :min-value="0"
      :max-value="500"
      text-color="#d8dee9"
      current-value-text=""
      :needle-transition-duration="2000"
      needle-transition="easeElastic"
      needle-color="grey"
      class="h-[30vh]"
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
