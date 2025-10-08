<script setup>
import CardTextGas from './CardTextGas.vue'
import LineChart from './LineChart.vue'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="w-[48vw] h-fit bg-dlh_blue rounded-xl flex flex-col pt-2 pb-4">
      <p class="font-poppins text-lg font-semibold text-center mt-2">Cuaca</p>
      <div class="border border-zinc-500 mt-4"></div>

      <div class="grid grid-cols-4 p-2 gap-2">
        <CardTextGas name="Kec. Angin" value="120" unit="mph" />
        <CardTextGas name="Arah Angin" value="120" unit="selatan" />
        <CardTextGas name="Suhu" value="120" unit="℃" />
        <CardTextGas name="Kelembapan" value="120" unit="%" />
        <CardTextGas name="Tekanan" value="120" unit="mBar" />
        <CardTextGas name="Curah Hujan" value="120" unit="mm/jam" />
        <CardTextGas name="Solar Radiasi" value="120" unit="W/m2" />
        <CardTextGas name="UV" value="120" unit="index" />
      </div>
    </div>
    <div class="w-[48vw] h-fit bg-dlh_blue rounded-xl flex flex-col pt-2 pb-4">
      <p class="font-poppins text-lg font-semibold text-center mt-2">Trend Cuaca</p>
      <div class="border border-zinc-500 mt-4"></div>

      <div class="w-full bg-dlh_blue_dark p-4 font-poppins mt-4">
        <div class="flex flex-row justify-center mb-4">
          <p class="font-bold text-sm">Suhu <span class="font-normal">(24 Jam)</span></p>
        </div>
        <div class="w-full h-[15vw]">
          <LineChart />
        </div>
      </div>
    </div>
  </div>
</template>
