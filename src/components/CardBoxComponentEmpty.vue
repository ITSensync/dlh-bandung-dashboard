<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <div class="text-center py-24 text-gray-500 dark:text-slate-400">
    <p>{{ props.text }}</p>
  </div>
</template>
