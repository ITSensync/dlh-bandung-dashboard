<script setup>
const param = defineProps({
  name: String,
  value: Number,
  unit: String,
})
</script>

<template>
  <div
    class="w-full h-[calc(100vh-745px)] rounded-xl flex flex-col items-center justify-center p-3 gap-2 bg-dlh_blue_dark font-poppins"
  >
    <p class="font-semibold text-md">{{ param.name }}</p>
    <p class="font-bold text-yellow-300 text-4xl">{{ param.value }}</p>
    <p class="font-semibold text-sm">{{ param.unit }}</p>
  </div>
</template>
