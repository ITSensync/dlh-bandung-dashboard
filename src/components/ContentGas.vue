<script setup>
import CardTextGas from './CardTextGas.vue'
</script>

<template>
  <div class="w-[13vw] h-full  bg-dlh_blue rounded-xl flex flex-col pt-2 pb-4">
    <p class="font-poppins text-lg font-semibold text-center mt-2">Gas</p>
    <div class="border border-zinc-500 mt-4"></div>

    <!-- CARD GAS -->
    <div class="grid grid-rows-5 px-4 mt-4 gap-2">
      <CardTextGas name="HC" value="20" unit="µg/m³" />
      <CardTextGas name="CO" value="20" unit="µg/m³" />
      <CardTextGas name="O3" value="20" unit="µg/m³" />
      <CardTextGas name="SO2" value="20" unit="µg/m³" />
      <CardTextGas name="NO2" value="20" unit="µg/m³" />
    </div>
  </div>
</template>
