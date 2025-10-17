<script setup>
import L from 'leaflet'
import { onMounted, watch, ref } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  name: { type: String, default: '' },
})

const map = ref(null)
let marker = null

function generateColorIspu(value) {
  switch (true) {
    case value >= 0 && value <= 50:
      return '#10B981'
    case value > 50 && value <= 100:
      return '#3B82F6'
    case value > 100 && value <= 200:
      return '#F59E0B'
    case value > 200 && value <= 300:
      return '#EF4444'
    case value > 300:
      return '#111827'
    default:
      return '#9CA3AF'
  }
}

function createMarker() {
  if (!map.value) return
  if (marker) {
    map.value.removeLayer(marker)
  }

  const color = generateColorIspu(props.value)

  const icon = L.divIcon({
    className: '',
    html: `
    <div style="
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      color: white;
      font-weight: 700;
      font-size: 14px;
      border: 2px solid white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
      background: ${color};
    ">
      ${props.value}
      <div style="
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
        width: 3px;
        height: 12px;
        background: ${color};
        border-radius: 2px;
      "></div>
    </div>
  `,
    iconSize: [50, 60],
    iconAnchor: [25, 55],
  })

  marker = L.marker([-6.858189893364737, 107.59426700036065], { icon })
    .addTo(map.value)
    .bindPopup(
      `AMDK PDAM BANDUNG, Jl. Sersan Bajuri No.5, Isola, Kec. Sukasari, Kota Bandung, Jawa Barat 40154`,
    )
}

onMounted(() => {
  map.value = L.map('map').setView([-6.858189893364737, 107.59426700036065], 15)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value)

  createMarker()
})

watch(
  () => [props.value, props.name],
  () => {
    createMarker()
  },
)
</script>

<template>
  <div id="map" class="rounded-xl"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
