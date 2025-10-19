<script setup lang="js">
// import ContentGas from '@/components/ContentGas.vue'
import ContentGas from '@/components/ContentGas.vue'
import ContentIspu from '@/components/ContentIspu.vue'
import ContentMap from '@/components/ContentMap.vue'
import ContentPartikulat from '@/components/ContentPartikulat.vue'
import ContentUdara from '@/components/ContentUdara.vue'
import ContentWeather from '@/components/ContentWeather.vue'
// import ContentWeather from '@/components/ContentWeather.vue'
import NavbarGuest from '@/components/NavbarGuest.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
</script>

<template>
  <LayoutGuest>
    <NavbarGuest />
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 p-4 gap-4"
    >
      <ContentMap />
      <ContentUdara />
      <ContentIspu />
    </div>
    <div class="px-4 2xl:h-[40vh]">
      <div class="flex flex-col justify-center bg-slate-900/70 rounded-xl h-full">
        <p class="font-poppins text-lg font-semibold text-center mt-2">Konsentrasi</p>
        <div class="border border-zinc-500 mt-4"></div>
        <div class="grid xl:grid-cols-3 gap-6 xl:gap-2 px-4 h-full">
          <ContentPartikulat />
          <ContentGas />
          <ContentWeather />
        </div>
      </div>
    </div>
  </LayoutGuest>
</template>
