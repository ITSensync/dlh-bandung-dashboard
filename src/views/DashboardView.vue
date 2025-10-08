<script setup lang="js">
import ContentUdara from '@/components/ContentUdara.vue';
import NavbarGuest from '@/components/NavbarGuest.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
</script>

<template>
  <LayoutGuest>
    <div class="min-h-screen bg-zinc-800">
      <NavbarGuest />
      <div class="flex flex-row h-full p-4">
        <ContentUdara/>
      </div>
    </div>
  </LayoutGuest>
</template>
