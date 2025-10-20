<script setup>
import CardTextGas from './CardTextGas.vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import './style.css'

// import required modules
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiCompass, mdiGauge, mdiSunWirelessOutline, mdiThermometer, mdiWaterPercent, mdiWeatherRainy, mdiWeatherWindy, mdiWhiteBalanceSunny } from '@mdi/js'

let intervalId = null
const mainStore = useMainStore()
const latestWeatherData = ref({
  ws: '0',
  wd: '0',
  hum: '0',
  temp: '0',
  press: '0',
  rain: '0',
  solar: '0',
  uv: '0',
  tanggal: '01-01-0000',
  jam: '00:00',
})
const listDailySuhu = ref([])
const listDailyUv = ref([])
const listDailyHujan = ref([])

const fetchData = async () => {
  await mainStore.fetch30Minute('weather')
  latestWeatherData.value = mainStore.latestWeather

  mainStore.fetch30Minute('daily')

  listDailySuhu.value = mainStore.listDaily30Minute.map((data) => {
    return {
      jam: data.jam,
      suhu: data.temp,
    }
  })

  listDailyUv.value = mainStore.listDaily30Minute.map((data) => {
    return {
      jam: data.jam,
      uv: data.uv,
    }
  })

  listDailyHujan.value = mainStore.listDaily30Minute.map((data) => {
    return {
      jam: data.jam,
      curah_hujan: data.rain,
    }
  })
}

onMounted(async () => {
  fetchData()

  intervalId = setInterval(() => {
    fetchData()
    // console.log('interval running')
  }, 300000) //5 menit sekali
})

watch(
  [() => mainStore.latestWeather, () => mainStore.listDaily30Minute],
  ([newLatestWeather, newList30Minute]) => {
    latestWeatherData.value = newLatestWeather

    listDailySuhu.value = newList30Minute
      .map((data) => {
        return {
          jam: data.jam,
          suhu: data.temp,
        }
      })
      .reverse()

    listDailyUv.value = newList30Minute
      .map((data) => {
        return {
          jam: data.jam,
          uv: data.uv,
        }
      })
      .reverse()

    listDailyHujan.value = newList30Minute
      .map((data) => {
        return {
          jam: data.jam,
          curah_hujan: data.rain,
        }
      })
      .reverse()
  },
)

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

/* const modules = [Autoplay]

const activeIndex = ref(0)

const title = ['Suhu', 'Curah Hujan', 'UV']

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex
  // console.log('Slide aktif:', activeIndex.value)
}

const currentTitle = computed(() => title[activeIndex.value]) */

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
  <div class="grid grid-cols-2 sm:grid-cols-4 py-4 gap-2">
    <CardTextGas
      name="Kec. Angin"
      :icon="mdiWeatherWindy"
      :value="Number(latestWeatherData?.ws)"
      unit="mph"
    />
    <CardTextGas
      name="Arah Angin"
      :icon="mdiCompass"
      :value="Number(latestWeatherData?.wd)"
      :unit="generateWindDirection(Number(latestWeatherData?.wd))"
    />
    <CardTextGas
      name="Suhu"
      :icon="mdiThermometer"
      :value="Number(latestWeatherData?.temp)"
      unit="°C"
    />
    <CardTextGas
      name="Kelembapan"
      :icon="mdiWaterPercent"
      :value="Number(latestWeatherData?.hum)"
      unit="%"
    />
    <CardTextGas
      name="Tekanan"
      :icon="mdiGauge"
      :value="Number(latestWeatherData?.press)"
      unit="mBar"
    />
    <CardTextGas
      name="Curah Hujan"
      :icon="mdiWeatherRainy"
      :value="Number(latestWeatherData?.rain)"
      unit="mm/jam"
    />
    <CardTextGas
      name="Solar Radiasi"
      :icon="mdiWhiteBalanceSunny"
      :value="Number(latestWeatherData?.solar)"
      unit="W/m²"
    />
    <CardTextGas
      name="UV"
      :icon="mdiSunWirelessOutline"
      :value="Number(latestWeatherData?.uv)"
      unit="index"
    />
  </div>
</template>
