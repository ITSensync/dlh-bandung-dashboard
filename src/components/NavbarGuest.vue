<script setup>
import { useTimeStore } from '@/stores/time'
import { onMounted } from 'vue'

const timeStore = useTimeStore()
onMounted(() => {
  timeStore.startClock()
})
</script>

<template>
  <div class="flex flex-row justify-between bg-dlh_blue_dark pl-2">
    <div class="flex flex-row gap-4 items-center py-2 justify-center">
      <img src="/dlh.png" alt="DLH LOGO" height="20" class="h-12" />
      <div className="flex-1">
        <a className="text-xl font-poppins font-extrabold"
          >Pemantauan Kualitas Udara Kota Bandung</a
        >
        <div class="flex flex-row gap-2 font-poppins font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6 fill-dlh_green"
          >
            <path
              fill-rule="evenodd"
              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clip-rule="evenodd"
            />
          </svg>
          <p>6.78 LU</p>
          <p>145.41 LS</p>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center justify-center bg-dlh_green font-poppins px-2">
      <p class="font-bold text-xl">{{ timeStore.time }} WIB</p>
      <p>{{ timeStore.date }}</p>
    </div>
  </div>
</template>
