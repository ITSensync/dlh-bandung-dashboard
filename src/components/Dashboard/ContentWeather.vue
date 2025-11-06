<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiCompass,
  mdiGauge,
  mdiSunWirelessOutline,
  mdiThermometer,
  mdiWaterPercent,
  mdiWeatherRainy,
  mdiWhiteBalanceSunny,
  mdiWindsock,
} from '@mdi/js'
import CardTextGas from '../Admin/CardTextGas.vue'

// let intervalId = null
const mainStore = useMainStore()
const latestWeatherData = computed(() => {
  const firstData = mainStore.listDaily30Minute?.[0] || {}
  return {
    tanggal: firstData.tanggal ?? '01-01-0001',
    jam: firstData.jam ?? '00:00',
    ws: firstData.ws ?? '-',
    wd: firstData.wd ?? '-',
    hum: firstData.hum ?? '-',
    temp: firstData.temp ?? '-',
    press: firstData.press ?? '-',
    rain: firstData.rain ?? '-',
    solar: firstData.solar ?? '-',
    uv: firstData.uv ?? '-',
  }
})

function generateWindDirection(windData) {
  switch (true) {
    case windData >= 0 && windData <= 23:
      return 'Utara'
    case windData >= 24 && windData <= 67:
      return 'Timur Laut'
    case windData >= 68 && windData <= 115:
      return 'Timur'
    case windData >= 116 && windData <= 167:
      return 'Tenggara'
    case windData >= 168 && windData <= 205:
      return 'Selatan'
    case windData >= 206 && windData <= 248:
      return 'Barat Daya'
    case windData >= 249 && windData <= 282:
      return 'Barat'
    case windData >= 283 && windData <= 334:
      return 'Barat Laut'
    case windData >= 335 && windData <= 360:
      return 'Utara'
    default:
      return '-'
  }
}
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 py-4 xl:pb-4 xl:pt-4 gap-2">
    <CardTextGas
      name="Kec. Angin"
      :icon="mdiWindsock"
      :value="latestWeatherData?.ws"
      unit="m/s"
    />
    <CardTextGas
      name="Arah Angin"
      :icon="mdiCompass"
      :value="latestWeatherData?.wd"
      :unit="generateWindDirection(Number(latestWeatherData?.wd))"
    />
    <CardTextGas
      name="Suhu"
      :icon="mdiThermometer"
      :value="latestWeatherData?.temp"
      unit="°C"
    />
    <CardTextGas
      name="Kelembapan"
      :icon="mdiWaterPercent"
      :value="latestWeatherData?.hum"
      unit="%"
    />
    <CardTextGas
      name="Tekanan"
      :icon="mdiGauge"
      :value="latestWeatherData?.press"
      unit="mBar"
    />
    <CardTextGas
      name="Curah Hujan"
      :icon="mdiWeatherRainy"
      :value="latestWeatherData?.rain"
      unit="mm/jam"
    />
    <CardTextGas
      name="Radiasi Matahari"
      :icon="mdiWhiteBalanceSunny"
      :value="latestWeatherData?.solar"
      unit="W/m²"
    />
    <CardTextGas
      name="UV"
      :icon="mdiSunWirelessOutline"
      :value="latestWeatherData?.uv"
      unit="index"
    />
  </div>
</template>
