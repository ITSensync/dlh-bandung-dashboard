<script setup>
import { computed } from 'vue'
import CardBox from './CardBox.vue'

const props = defineProps({
  solarRadiation: {
    type: Number,
    default: 0,
  },
})

const totalLayers = 13

const colorSteps = [
  '#2E7D32', // hijau tua
  '#43A047',
  '#7CB342',
  '#FBC02D', // kuning
  '#F9A825',
  '#FB8C00', // oranye
  '#EF6C00',
  '#E65100',
  '#D84315', // oranye kemerahan
  '#C62828', // merah
  '#B71C1C',
  '#9E9E9E', // abu (misal transisi ke putih)
  '#FFFFFF', // putih puncak
]

const activeLayers = computed(() => {
  const maxValue = 13
  const ratio = Math.min(props.solarRadiation / maxValue, 1)
  return Math.ceil(ratio * totalLayers)
})

const getColor = (index) => {
  if (index <= activeLayers.value) {
    return colorSteps[index - 1] || colorSteps[colorSteps.length - 1]
  }
  return '-'
}

const generateStatus = (val) => {
  switch (true) {
    case val >= 0 && val < 3:
      return 'Aman'
    case val >= 4 && val < 7:
      return 'Sedang'
    case val >= 8 && val < 11:
      return 'Tinggi'
    case val > 12:
      return 'Sangat Tinggi'
    default:
      return '-'
  }
}
</script>

<template>
  <CardBox>
    <div class="flex flex-col gap-4">
      <p class="font-poppins">UV</p>

      <div class="flex flex-col sm:flex-row w-full justify-between gap-5 px-4">
        <div class="sm:w-2/3 flex sm:inline justify-center">
          <svg
            width="162px"
            height="136px"
            viewBox="0 0 162 136"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fill-rule="evenodd">
              <polygon
                v-for="(points, index) in [...polygonPoints].reverse()"
                :key="index"
                :fill="getColor(index + 1)"
                :points="points"
                stroke="#000"
                stroke-width="0.5"
              />
            </g>
          </svg>
        </div>
        <div class="flex sm:flex-col gap-4 justify-between sm:justify-start w-full sm:w-1/3">
          <div class="flex flex-col font-poppins">
            <p class="font-medium text-lg text-zinc-400">Rasio UV</p>
            <p class="font-bold text-lg">{{ props.solarRadiation }}</p>
          </div>
          <div class="flex flex-col font-poppins">
            <p class="font-medium text-lg text-zinc-400">UV Status</p>
            <p class="font-bold text-lg">{{ generateStatus(props.solarRadiation) }}</p>
          </div>
        </div>
      </div>
    </div>
  </CardBox>
</template>

<script>
// titik polygon dari bawah ke atas (seperti UV sebelumnya)
export const polygonPoints = [
  '81.9537723 2.99975159 77.2979826 10.4602611 86.4956236 10.4362484',
  '92.8108692 20.7694268 70.8323051 20.8356688 76.2650231 12.1248408 87.5102538 12.0925478',
  '99.1192621 31.0946561 64.3589492 31.2022994 69.7916672 22.4914713 93.8186467 22.4177771',
  '105.434921 41.428828 57.8945103 41.5778726 63.3272282 32.8670446 100.134305 32.751121',
  '111.751405 51.7620892 51.4218149 51.9450828 56.8627892 43.2334268 106.442533 43.0769299',
  '118.058972 62.0882293 44.9567154 62.3192484 50.3894333 53.6092484 112.758356 53.4105223',
  '124.367447 72.4134586 38.4834421 72.686707 43.9244164 63.975879 119.066832 63.7440318',
  '130.17996 81.9276369 32.5388267 82.2331783 37.4513908 74.3512038 125.38216 74.0696752',
  '136.495618 92.2528662 26.0661313 92.6006369 31.4988492 83.8889809 131.195003 83.5759873',
  '142.804011 102.58621 19.6010318 102.96793 25.0337497 94.2562739 137.503396 93.9093312',
  '149.111661 112.912268 13.1285841 113.342841 18.5613021 104.632013 143.819302 104.242013',
  '155.427732 123.23758 6.66373231 123.717834 12.0964503 115.007006 150.127117 114.560701',
  '5.62342462 125.373554 0.999834872 132.792662 161.264189 132.792662 156.435014 124.893299',
]
</script>
