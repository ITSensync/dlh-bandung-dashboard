<script setup>
const props = defineProps({
  dataIspu: {
    type: Array,
    default: () => [],
  },
})

// fungsi untuk menentukan warna berdasarkan nilai
const getColor = (val) => {
  if (val <= 50) return 'bg-emerald-500'
  if (val <= 100) return 'bg-sky-600'
  if (val <= 200) return 'bg-yellow-500'
  if (val <= 300) return 'bg-red-600'
  return 'bg-zinc-900'
}

// fungsi untuk menentukan tinggi relatif berdasarkan nilai maksimum
const getHeight = (val) => {
  if (val <= 50) {
    return `${(val / 50) * 8}vh`
  } else if (val <= 100) {
    return `${8 + ((val - 50) / 50) * 8}vh`
  } else if (val <= 200) {
    return `${16 + ((val - 100) / 100) * 8}vh`
  } else if (val <= 300) {
    return `${24 + ((val - 200) / 100) * 8}vh`
  } else {
    return `${32 + ((val - 300) / 100) * 8}vh`
  }
}

const listKategori = [
  { label: 'Berbahaya', color: 'bg-zinc-900' },
  { label: 'Sangat Tidak Sehat', color: 'bg-red-600' },
  { label: 'Tidak Sehat', color: 'bg-yellow-500' },
  { label: 'Sedang', color: 'bg-sky-600' },
  { label: 'Sehat', color: 'bg-emerald-500' },
]
</script>

<template>
  <div class="flex flex-col font-poppins text-center text-[10px] md:text-sm w-1/5 md:w-1/3">
    <div
      v-for="(kategori, i) in listKategori"
      :key="i"
      class="h-[8vh] flex items-center justify-center"
      :class="kategori.color"
    >
      <p>{{ kategori.label }}</p>
    </div>
    <p class="text-center mt-4">Kategori</p>
  </div>
  <div class="flex items-end justify-between h-full gap-0 sm:gap-4 w-4/5 md:w-2/3">
    <div
      v-for="(data, i) in props.dataIspu"
      :key="i"
      class="flex flex-col items-center justify-end gap-1 sm:gap-2 w-5 md:w-10"
    >
      <!-- VALUE -->
      <div class="relative flex flex-col justify-end bg-gray-500 w-full h-[40vh] overflow-hidden">
        <!-- BAR WARNA -->
        <div class="w-full text-[10px] sm:text-xs text-center font-bold text-white py-0.5">
          {{ data.value }}
        </div>
        <div
          class="left-0 w-full transition-all duration-500"
          :class="getColor(data.value)"
          :style="{ height: `${getHeight(data.value)}` }"
        ></div>
      </div>

      <!-- LABEL -->
      <p class="text-[10px] sm:text-sm font-medium mt-3">{{ data.label }}</p>
    </div>
  </div>
</template>
