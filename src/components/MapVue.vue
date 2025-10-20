<!-- eslint-disable no-unused-vars -->
<script setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// import 'leaflet-velocity/dist/leaflet-velocity.css'
// import 'leaflet-velocity'
import { computed, onMounted, watch } from 'vue'
import { useMainStore } from '@/stores/main'

const props = defineProps({
  value: { type: Number, default: 0 },
  name: { type: String, default: '' },
})

const mainStore = useMainStore()
const weatherLatestData = computed(() => mainStore.latestWeather)

let map = null
let marker = null
let velocityLayer = null

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
  if (!map) return
  if (marker) {
    map.removeLayer(marker)
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
      width: 50px;
      height: 50px;
      border-radius: 50%;
      color: white;
      font-weight: 700;
      font-size: 16px;
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
    iconSize: [45, 60],
    iconAnchor: [22.5, 60],
  })

  marker = L.marker([-6.858189893364737, 107.59426700036065], { icon })
    .addTo(map)
    .bindPopup(
      `AMDK PDAM BANDUNG, Jl. Sersan Bajuri No.5, Isola, Kec. Sukasari, Kota Bandung, Jawa Barat 40154`,
    )
}

function createWindLayer(ws, wd) {
  if (!map) return

  if (velocityLayer) map.removeLayer(velocityLayer)

  const dir = wd * (Math.PI / 180)
  const u = -ws * Math.sin(dir)
  const v = -ws * Math.cos(dir)

  const nx = 360
  const ny = 181
  const lons = 90
  const lats = 0
  const lons2 = 359
  const lats2 = -90
  const uGrid = Array(nx * ny).fill(u)
  const vGrid = Array(nx * ny).fill(v)

  const windData = {
    data: [
      {
        header: {
          parameterCategory: 2,
          parameterNumber: 2,
          lo1: lons,
          la1: lats,
          dx: 1,
          dy: 1,
          nx,
          ny,
          lo2: lons2,
          la2: lats2,
          refTime: new Date().toISOString(),
        },
        data: uGrid,
      },
      {
        header: {
          parameterCategory: 2,
          parameterNumber: 3,
          lo1: lons,
          la1: lats,
          lo2: lons2,
          la2: lats2,
          dx: 1,
          dy: 1,
          nx,
          ny,
          refTime: new Date().toISOString(),
        },
        data: vGrid,
      },
    ],
  }

  velocityLayer = L.velocityLayer({
    displayValues: false,
    /* displayOptions: {
      velocityType: 'Wind',
      displayPosition: 'bottomleft',
      displayEmptyString: 'No wind data',
      angleConvention: 'bearingCW',
      speedUnit: 'm/s',
    }, */
    data: windData.data,
    maxVelocity: 10,
    velocityScale: 0.01,
    colorScale: ['#0033cc', '#0099ff', '#66ff66', '#ffcc00', '#ff3300', '#ff0000'],
  })

  velocityLayer.addTo(map)
}

onMounted(async () => {
  map = L.map('map', {
    center: [-6.858189893364737, 107.59426700036065],
    zoom: 16,
    minZoom: 10,
    maxZoom: 18,
    zoomControl: true,
  })

  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: '',
    },
  ).addTo(map)

  createMarker()

  const { default: velocityPlugin } = await import('leaflet-velocity')
  await import('leaflet-velocity/dist/leaflet-velocity.css')

  if (!L.velocityLayer && velocityPlugin) {
    L.velocityLayer = velocityPlugin
  }

  createWindLayer(Number(weatherLatestData.value?.ws), Number(weatherLatestData.value?.wd))
})

watch(
  () => [props.value, props.name],
  () => {
    createMarker()
  },
)

watch(
  weatherLatestData,
  (newVal) => {
    if (newVal?.ws && newVal?.wd) {
      createWindLayer(Number(newVal.ws), Number(newVal.wd))
    }
  },
  { immediate: true }, // ⬅️ ini penting
)
</script>

<template>
  <div id="map" class="rounded-xl"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 30vh;
}

@media (min-width: 768px) {
  #map {
    height: 100%;
  }
}
</style>
