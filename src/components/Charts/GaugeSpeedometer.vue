<script setup>
import VueSpeedometer from 'vue-speedometer'

const props = defineProps({
  name: String,
  value: Number,
})

</script>

<template>
  <div class="flex items-center justify-center w-fit h-full p-0 m-0 overflow-hidden">
    <VueSpeedometer
      :width="350"
      :height="250"
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
      class="xl:h-[30vh] lg:h-[45vh] md:h-[60vh] h-[90vh]"
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
