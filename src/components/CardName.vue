<script setup>
import { mdiCheckBold, mdiCloseThick } from '@mdi/js'
import BaseIcon from './BaseIcon.vue'
import CardBox from './CardBox.vue'
import { computed, onMounted, onUnmounted, ref, } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: 'Alief',
  },
  checkIn: {
    type: String,
    default: '07:00',
  },
  lastUpdate: {
    type: String,
    default: '07:00',
  },
})

const timeNow = ref(new Date())
let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    timeNow.value = new Date()
  }, 60 * 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const notConnect = computed(() => {
  if (!props.lastUpdate) return true

  const today = new Date().toISOString().split('T')[0] // ex: "2025-09-08"
  const lastUpdateDate = new Date(`${today}T${props.lastUpdate}`)
  const diffMin = (timeNow.value - lastUpdateDate) / 60000

  return diffMin > 10
})
</script>

<template>
  <CardBox
    rounded="rounded-lg"
    class="shadow-[0px_0px_5px_rgba(0,0,0,0.3)]"
    :class="
      notConnect
        ? 'shadow-red-200 animate-[pulseShadowNotConnect_2s_ease-in-out_infinite]'
        : 'shadow-emerald-200 animate-[pulseShadowConnect_2s_ease-in-out_infinite]'
    "
  >
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <p class="text-3xl font-semibold">{{ props.name }}</p>
        <p class="text-zinc-400 text-xs">
          Check-In: <span class="font-bold italic">{{ props.checkIn }}</span>
        </p>
        <p class="text-zinc-400 text-xs">
          Update: <span class="font-bold italic">{{ props.lastUpdate }}</span>
        </p>
      </div>
      <BaseIcon
        :path="notConnect ? mdiCloseThick : mdiCheckBold"
        size="48"
        w=""
        h="h-16"
        :class="notConnect ? 'text-red-200' : 'text-emerald-200'"
      />
    </div>
  </CardBox>
</template>

<style>
@keyframes pulseShadowConnect {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(164, 244, 207, 0.2); /* redup */
  }
  50% {
    box-shadow: 0 0 11px rgba(164, 244, 207, 0.8); /* nyala */
  }
}

@keyframes pulseShadowNotConnect {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(244, 164, 164, 0.2); /* redup */
  }
  50% {
    box-shadow: 0 0 11px rgba(244, 164, 164, 0.8); /* nyala */
  }
}
</style>
