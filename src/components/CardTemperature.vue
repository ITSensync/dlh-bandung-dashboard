<script setup>
import CardBox from './CardBox.vue'
</script>

<template>
  <CardBox class="">
    <div class="flex flex-col gap-5">
      <p class="font-poppins">Suhu (°C)</p>
      <div class="flex w-full justify-between gap-5 px-4">
        <div class="w-2/3">
          <div
            class="flex flex-col items-center justify-center h-40 w-40 rounded-full dark:bg-blue-950 bg-zinc-100 outline-5 outline-emerald-400"
          >
            <p class="font-poppins font-medium text-xl">Current</p>
            <p class="font-poppins font-bold text-5xl text-emerald-400">50°</p>
          </div>
        </div>
        <div class="flex flex-col gap-4 w-1/3">
          <div class="flex flex-col font-poppins">
            <p class="font-medium text-lg text-zinc-400">Titik Embun</p>
            <p class="font-bold text-lg">10 °C</p>
          </div>
          <div class="flex flex-col font-poppins">
            <p class="font-medium text-lg text-zinc-400">Kelembapan</p>
            <p class="font-bold text-lg">10%</p>
          </div>
        </div>
      </div>
    </div>
  </CardBox>
</template>
