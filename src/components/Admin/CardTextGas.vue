<script setup>
import BaseIcon from '../BaseIcon.vue';


const param = defineProps({
  name: String,
  value: String,
  unit: String,
  icon: String,
  class_name: String,
  class_value: String,
  class_unit: String,
})


</script>

<template>
  <div
    class="w-full h-full rounded-xl flex flex-col items-center justify-center p-3 gap-2 bg-slate-950 text-center font-poppins overflow-hidden"
  >
    <div class="flex items-center gap-2 h-fit">
      <BaseIcon v-if="icon" :path="icon" size="30" w="" h="" />
      <p
        class="font-semibold text-xs sm:text-base break-all"
        :class="`xl:text-sm 2xl:text-lg 3xl:text-xl`"
        v-html="param.name"
      ></p>
    </div>
    <p
      class="font-bold text-yellow-300 text-2xl sm:text-4xl"
      :class="`xl:text-4xl 2xl:text-5xl`"
    >
      {{ param.value }}
    </p>
    <p class="font-semibold text-sm 3xl:text-md" :class="param.class_unit">{{ param.unit }}</p>
  </div>
</template>
