<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import CardBox from './CardBox.vue'

const props = defineProps({
  val: {
    type: Number,
    default: 0,
  },
})

const maxVal = 1000
const animatedVal = ref(0)

// Animasi halus
const animateTo = (target) => {
  const start = animatedVal.value
  const duration = 1000
  const startTime = performance.now()

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    animatedVal.value = start + (target - start) * progress
    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

onMounted(() => animateTo(props.val))
watch(
  () => props.val,
  (val) => animateTo(val),
)

const percent = computed(() => Math.min((animatedVal.value / maxVal) * 100, 100))
const radius = 40
const circumference = 2 * Math.PI * radius
const offset = computed(() => circumference - (percent.value / 100) * circumference)
</script>

<template>
  <CardBox>
    <div class="flex flex-col justify-between w-full h-full">
      <p class="font-poppins">Solar Radiasi</p>

      <div class="flex flex-col sm:flex-row w-full justify-between items-center gap-5 py-4">
        <div class="relative flex justify-center items-center w-[160px] h-[160px]">
          <svg :width="160" :height="160" viewBox="0 0 120 120" class="transform -rotate-90">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#fb8a24" />
                <stop offset="100%" stop-color="#fb8a24" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="3"
                  flood-color="#FFB300"
                  flood-opacity="0.8"
                />
              </filter>
            </defs>

            <!-- Background track -->
            <circle cx="60" cy="60" :r="radius" stroke="#2e3a4b" stroke-width="10" fill="none" />

            <!-- Progress -->
            <circle
              cx="60"
              cy="60"
              :r="radius"
              stroke="url(#grad)"
              stroke-width="10"
              fill="none"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="offset"
              filter="url(#glow)"
            />
          </svg>

          <!-- Ikon matahari -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span style="font-size: 65px">☀️</span>
          </div>
        </div>

        <!-- Nilai -->
        <div class="flex flex-col items-center sm:items-start font-poppins sm:w-1/3">
          <p class="font-medium text-lg text-zinc-400">Rasio Saat ini</p>
          <p class="font-bold text-lg">{{ props.val }} watt/m<sup>2</sup></p>
        </div>
      </div>
    </div>
  </CardBox>
</template>

<style scoped>
svg {
  display: block;
}
</style>
