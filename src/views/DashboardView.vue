<script setup lang="js">
import ContentGas from '@/components/ContentGas.vue'
import ContentUdara from '@/components/ContentUdara.vue'
import ContentWeather from '@/components/ContentWeather.vue'
import NavbarGuest from '@/components/NavbarGuest.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
</script>

<template>
  <LayoutGuest>
    <div class="min-h-screen bg-zinc-800 text-white">
      <NavbarGuest />
      <div class="flex flex-col md:grid md:grid-cols-3 lg:flex lg:flex-row h-full xl:h-[100vh] 2xl:h-[95vh] p-4 gap-4">
        <ContentUdara />
        <ContentGas />
        <ContentWeather />
      </div>
    </div>
  </LayoutGuest>
</template>
