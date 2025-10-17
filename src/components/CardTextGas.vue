<script setup>
const param = defineProps({
  name: String,
  value: Number,
  unit: String,
  class_name: String,
  class_value: String,
  class_unit: String,
})
</script>

<template>
  <div
    class="w-full h-full rounded-xl flex flex-col items-center justify-center p-3 gap-2 bg-slate-950 text-center font-poppins"
  >
    <p class="font-semibold text-md" :class="param.class_name">{{ param.name }}</p>
    <p class="font-bold text-yellow-300 text-4xl" :class="param.class_value">{{ param.value }}</p>
    <p class="font-semibold text-sm" :class="param.class_unit">{{ param.unit }}</p>
  </div>
</template>
