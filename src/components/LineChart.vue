<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const props = defineProps({
  param: {
    type: String,
    default: '',
  },
  listData: {
    type: Array,
    default: () => [],
  },
})

const generateColor = (param) => {
  switch (true) {
    case param === 'pm10':
      return {
        border: 'rgb(255, 99, 132)', // merah
        bg: 'rgba(255, 99, 132, 0.2)',
      }

    case param === 'pm25':
      return {
        border: 'rgb(75, 192, 75)', // hijau
        bg: 'rgba(75, 192, 75, 0.2)',
      }

    default: {
      // 🎨 warna pastel acak
      const pastel = () => Math.floor(Math.random() * 128 + 127) // 127–255 → warna lembut/pastel
      const r = pastel()
      const g = pastel()
      const b = pastel()

      return {
        border: `rgb(${r}, ${g}, ${b})`,
        bg: `rgba(${r}, ${g}, ${b}, 0.2)`,
      }
    }
  }
}

const color = generateColor(props.param)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
    },
  },
}

const data = computed(() => ({
  labels: props.listData.map((i) => i.jam.slice(0,5)),
  datasets: [
    {
      label: props.param.toUpperCase(),
      data: props.listData.map((i) => i[props.param]),
      borderColor: color.border,
      backgroundColor: color.bg,
      tension: 0.4,
      fill: true,
    },
  ],
}))
</script>

<template>
  <Line :data="data" :options="options" />
</template>
