<script setup>
import LineChart from './LineChart.vue'
</script>

<template>
  <div class="w-[35vw] bg-dlh_blue rounded-xl flex flex-col pt-2 pb-4">
    <p class="font-poppins text-xl font-semibold text-center mt-2">Kualitas Udara</p>
    <div class="border border-zinc-500 mt-4"></div>

    <!-- HEADER NILAI -->
    <div class="flex flex-row mt-1 gap-2">
      <div
        class="w-1/2 bg-dlh_blue_dark flex flex-col items-center justify-center font-poppins py-2"
      >
        <p class="font-semibold">Update</p>
        <p class="font-bold text-yellow-300">12 Februari 2025 00:00</p>
      </div>
      <div
        class="w-1/2 bg-dlh_blue_dark flex flex-col items-center justify-center font-poppins py-2"
      >
        <p class="font-semibold">Parameter Tertinggi</p>
        <p class="font-bold text-yellow-300">PM10</p>
      </div>
    </div>

    <!-- NILAI -->
    <div class="flex flex-row gap-2">
      <div class="w-1/2 items-center py-5 flex justify-center">
        <div class="rounded-full bg-emerald-400 h-[15vh] w-[15vh] flex justify-center items-center">
          <p class="font-poppins font-extrabold text-6xl text-center text-shadow-lg">15</p>
        </div>
      </div>

      <div class="w-1/2 flex flex-col items-center justify-center">
        <p>ICON</p>
        <p class="font-poppins font-bold text-2xl">SEHAT</p>
        <p class="font-poppins font-normal text-xs">KET</p>
      </div>
    </div>

    <!-- GRAPH PM10 -->
    <div class="w-full bg-dlh_blue_dark p-4 font-poppins">
      <div class="flex flex-row justify-between">
        <p class="font-bold text-sm">Konsentrasi PM10 <span class="font-normal">(24 Jam)</span></p>
        <div class="flex flex-row gap-4 font-bold text-xs">
          <div class="badge badge-error">MAX: -</div>
          <div class="badge badge-accent">MIN: -</div>
          <div class="badge badge-success">AVG: -</div>
        </div>
      </div>
      <div class="">
        <LineChart />
      </div>
    </div>
    <div class="w-full bg-dlh_blue_dark p-4 font-poppins mt-4">
      <div class="flex flex-row justify-between">
        <p class="font-bold text-sm">Konsentrasi PM2.5 <span class="font-normal">(24 Jam)</span></p>
        <div class="flex flex-row gap-4 font-bold text-xs">
          <div class="badge badge-error">MAX: -</div>
          <div class="badge badge-accent">MIN: -</div>
          <div class="badge badge-success">AVG: -</div>
        </div>
      </div>
      <div>
        <LineChart />
      </div>
    </div>
  </div>
</template>
