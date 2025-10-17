<script setup lang="ts">
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <div class="bg-gray-50 dark:bg-slate-800 dark:text-slate-100 min-h-screen">
    <slot />
    <FooterBar class="inset-x-0 bottom-0"> AQMS DLH KOTA BANDUNG </FooterBar>
  </div>
</template>
