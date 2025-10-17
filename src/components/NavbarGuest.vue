<script setup>
import { useTimeStore } from '@/stores/time'
import { onMounted } from 'vue'

const timeStore = useTimeStore()
onMounted(() => {
  timeStore.startClock()
})
</script>

<template>
  <div class="flex flex-row justify-between bg-slate-900/70 pl-2 shadow-2xl">
    <div class="flex flex-row gap-4 items-center py-2 justify-center w-full sm:w-fit">
      <img src="/dlh.png" alt="DLH LOGO" height="20" class="h-12 sm:h-12" />
      <div class="hidden sm:flex-1 sm:flex sm:flex-col">
        <a class="text-xs sm:text-xl font-poppins font-extrabold"
          >Pemantauan Kualitas Udara Kota Bandung</a
        >
      </div>
    </div>
    <div class="hidden sm:flex flex-col items-center justify-center bg-dlh_green font-poppins px-2">
      <p class="font-bold text-xl">{{ timeStore.time }} WIB</p>
      <p>{{ timeStore.date }}</p>
    </div>
  </div>
</template>
