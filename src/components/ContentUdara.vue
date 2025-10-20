<script setup>
import { useMainStore } from '@/stores/main'
// import LineChart from './LineChart.vue'
import { computed } from 'vue'
import DateFormatter from '@/utils/DateFormatter'

// let intervalId = null
const mainStore = useMainStore()
/* const ispuLatestData = ref({
  pm25: '0',
  pm10: '0',
  hc: '0',
  co: '0',
  o3: '0',
  no2: '0',
  so2: '0',
  ket: '-',
  status: '-',
  tanggal: '01-01-0001',
  jam: '00:00:00',
})

const bars = ref([])
const maxIspu = ref({ param: '-', value: 0 }) */

const ispuLatestData = computed(() => mainStore.ispuLatest)

const maxIspu = computed(() => {
  const data = ispuLatestData.value
  if (!data) return { param: '-', value: 0 }

  const keys = ['pm25', 'pm10', 'so2', 'no2', 'co', 'o3', 'hc']
  const maxParam = keys.reduce((a, b) => (Number(data[a]) > Number(data[b]) ? a : b))
  return { param: maxParam, value: Number(data[maxParam]) }
})

/* const fetchData = async () => {
  await mainStore.fetchIspuLatest()
  ispuLatestData.value = mainStore.ispuLatest

  if (ispuLatestData.value) {
    maxIspu.value = getMaxIspu(ispuLatestData.value)
  }

  const data = ispuLatestData.value || {}
  bars.value = [
    { label: 'PM10', value: Number(data.pm10) || 0 },
    { label: 'PM2.5', value: Number(data.pm25) || 0 },
    { label: 'SO2', value: Number(data.so2) || 0 },
    { label: 'CO', value: Number(data.co) || 0 },
    { label: 'O3', value: Number(data.o3) || 0 },
    { label: 'NO2', value: Number(data.no2) || 0 },
    { label: 'HC', value: Number(data.hc) || 0 },
  ]
} */

/* onMounted(async () => {
  fetchData()

  intervalId = setInterval(() => {
    fetchData()
    // console.log('interval running')
  }, 300000) //5 menit sekali
})

watch(
  [() => mainStore.ispuLatest, () => mainStore.listIspuPM10, () => mainStore.listIspuPM25],
  ([newIspuLatest]) => {
    if (newIspuLatest) {
      ispuLatestData.value = newIspuLatest
      maxIspu.value = getMaxIspu(newIspuLatest)
      bars.value = [
        { label: 'PM10', value: Number(newIspuLatest.pm10) || 0 },
        { label: 'PM2.5', value: Number(newIspuLatest.pm25) || 0 },
        { label: 'SO2', value: Number(newIspuLatest.so2) || 0 },
        { label: 'CO', value: Number(newIspuLatest.co) || 0 },
        { label: 'O3', value: Number(newIspuLatest.o3) || 0 },
        { label: 'NO2', value: Number(newIspuLatest.no2) || 0 },
        { label: 'HC', value: Number(newIspuLatest.hc) || 0 },
      ]
    }
  },
)

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
}) */

/* function getMaxIspu(data) {
  const keys = ['pm25', 'pm10', 'so2', 'no2', 'co', 'o3', 'hc']
  const maxParam = keys.reduce((a, b) => (Number(data[a]) > Number(data[b]) ? a : b))
  return { param: maxParam, value: Number(data[maxParam]) }
} */

/* function getIspuStats(data, key = 'pm25') {
  const values = data.map((item) => Number(item[key])).filter((val) => !isNaN(val))

  if (values.length === 0) return { max: 0, min: 0, avg: 0 }

  const max = Math.max(...values)
  const min = Math.min(...values)
  const avg = values.reduce((a, b) => a + b, 0) / values.length

  return { max, min, avg: Number(avg.toFixed(2)) }
} */

function generateColorIspu(value) {
  switch (true) {
    case value >= 0 && value <= 50:
      return 'bg-emerald-400'
    case value > 50 && value <= 100:
      return 'bg-blue-400'
    case value > 100 && value <= 200:
      return 'bg-amber-400'
    case value > 200 && value <= 300:
      return 'bg-red-400'
    case value > 300:
      return 'bg-zinc-900'
    default:
      return 'bg-zinc-400'
  }
}

function generateIcon(value) {
  switch (true) {
    case value >= 0 && value <= 50:
      // 😊 Sehat
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 xl:w-20 xl:h-20 2xl:w-30 2xl:h-30 text-emerald-500" viewBox="0 0 24 24"><!-- Icon from css.gg by Astrit - https://github.com/astrit/css.gg/blob/master/LICENSE --><g fill="currentColor"><path d="M16 13h-2a2 2 0 1 1-4 0H8a4 4 0 0 0 8 0m-6-3a1 1 0 1 1-2 0a1 1 0 0 1 2 0m5 1a1 1 0 1 0 0-2a1 1 0 0 0 0 2"/><path fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-2 0a8 8 0 1 1-16 0a8 8 0 0 1 16 0" clip-rule="evenodd"/></g></svg>`
    case value > 50 && value <= 100:
      // 😐 Sedang
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 xl:w-20 xl:h-20 2xl:w-30 2xl:h-30 text-sky-500" viewBox="0 0 24 24"><!-- Icon from css.gg by Astrit - https://github.com/astrit/css.gg/blob/master/LICENSE --><g fill="currentColor"><path d="M9 11a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm7-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0"/><path fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-2 0a8 8 0 1 1-16 0a8 8 0 0 1 16 0" clip-rule="evenodd"/></g></svg>`
    case value > 100 && value <= 200:
      // 😷 Tidak Sehat
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 xl:w-20 xl:h-20 2xl:w-30 2xl:h-30 text-yellow-400" viewBox="0 0 48 48"><!-- Icon from Health Icons by Resolve to Save Lives - https://github.com/resolvetosavelives/healthicons/blob/main/LICENSE --><g fill="currentColor"><path d="M18 30h12v2H18zm12 4H18v2h12zm-8.698-11.558c.13-.358.091-.795-.016-1.193a4.2 4.2 0 0 0-.61-1.28c-.581-.829-1.544-1.59-2.845-1.646c-1.347-.056-2.353.799-2.973 1.706a5.6 5.6 0 0 0-.695 1.416c-.143.446-.219.902-.169 1.267a.5.5 0 0 0 .766.352c.4-.256.819-.607 1.207-.931c.176-.148.347-.29.505-.415c.562-.444 1-.697 1.363-.715c.344-.017.742.18 1.244.556c.18.134.353.276.534.424l.195.159c.244.197.504.399.766.557a.5.5 0 0 0 .728-.257m5.311 0c-.13-.358-.09-.795.017-1.193c.112-.416.319-.863.61-1.28c.58-.829 1.544-1.59 2.845-1.646c1.346-.056 2.353.799 2.973 1.706c.314.46.548.958.695 1.416c.142.446.218.902.168 1.267a.5.5 0 0 1-.765.352c-.4-.256-.82-.607-1.207-.931a25 25 0 0 0-.505-.415c-.563-.444-1-.697-1.363-.715c-.344-.017-.743.18-1.244.556c-.18.134-.354.276-.534.424l-.196.159a7 7 0 0 1-.765.557a.5.5 0 0 1-.729-.257"/><path fill-rule="evenodd" d="M41.853 26.315a17.95 17.95 0 0 1-5.336 10.62L36.5 37q-.28.243-.564.473A17.93 17.93 0 0 1 24 42a17.92 17.92 0 0 1-10.875-3.655q-.57-.4-1.125-.845l-.039-.118a17.97 17.97 0 0 1-5.792-10.904c-.902-.656-1.677-1.582-1.834-2.864c-.194-1.59.612-3.345 2.434-5.296a1 1 0 0 1 .203-.168C9.4 11.08 16.107 6 24 6c7.984 0 14.754 5.198 17.11 12.395c1.771 1.92 2.554 3.65 2.362 5.219c-.144 1.179-.812 2.057-1.62 2.701M14.308 36.732c6.38 4.468 14.025 4.323 20.332-.783l.081-.073c.41-1.665.6-2.88.567-4.037c-.03-1.042-.242-2.131-.755-3.531c-4.117-.863-7.348-1.296-10.54-1.308c-3.17-.011-6.378.393-10.443 1.279c-.449 1.487-.637 2.644-.633 3.752c.005 1.217.242 2.494.777 4.21q.3.252.614.491m-3.316-3.412c-.18-1.622-.036-3.135.451-4.948a19 19 0 0 1-.913-.166c-.625-.13-1.37-.318-2.12-.588a15.9 15.9 0 0 0 2.582 5.702m24.524-6.848c-8.94-1.919-14.151-2.01-23.116.013l-.27-.034a17 17 0 0 1-1.193-.204c-.911-.189-1.989-.492-2.887-.956A16 16 0 0 1 8 24c0-8.837 7.164-16 16-16s16 7.163 16 16q0 .597-.043 1.183l-.012.007c-.933.52-2.1.855-3.075 1.057a17 17 0 0 1-1.353.225m1.138 1.852c.547 1.693.716 3.113.605 4.632a15.9 15.9 0 0 0 2.347-5.416a15.6 15.6 0 0 1-2.33.666q-.333.069-.622.118" clip-rule="evenodd"/></g></svg>`
    case value > 200 && value <= 300:
      // 🤧 Sangat Tidak Sehat
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 xl:w-20 xl:h-20 2xl:w-30 2xl:h-30 text-red-500" viewBox="0 0 64 64"><!-- Icon from Emoji One (Monotone) by Emoji One - https://creativecommons.org/licenses/by/4.0/ --><path fill="currentColor" d="M35 2C20.09 2 8 14.09 8 29c0 2.935.493 5.748 1.358 8.393c-2.176.214-4.603.365-7.358.433c0 0 1.719 12.417 10.967 12.417q.92.002 1.939-.171a6.3 6.3 0 0 1 1.043-.094c5.948 0 3.279 10.354 3.279 10.354s4.877-6.306 7.977-6.306c.865 0 1.592.491 2.037 1.745C31.332 61.662 36.076 62 36.076 62c1.313-1.83 2.384-4.007 3.227-6.352C52.168 53.588 62 42.446 62 29C62 14.09 49.912 2 35 2m.184 57.732c-.883-.343-2.166-1.119-3.2-2.818c1.624-3.437 5.586-13.053 3.127-20.602c-.31-.947-4.533 6.007-13.382 17.762c-.158-1.484-.556-2.944-1.423-4.063a5.1 5.1 0 0 0-1.398-1.253c2.633-1.653 10.409-6.963 11.765-12.778c.734-3.151-11.016 2.462-23.535 9.237c-1.375-1.744-2.194-3.895-2.651-5.476c14.033-.625 19.399-3.446 25.062-6.423c1.391-.731 2.827-1.486 4.398-2.197c.53-.24 1.014-.362 1.438-.362c.964 0 1.821.72 2.55 2.139c2.903 5.657 2.1 18.967-2.751 26.834m4.828-6.264c3.201-11.102 1.564-24.709-4.628-24.709c-.697 0-1.452.172-2.265.54c-6.614 2.995-10.319 6.425-21.738 7.87A24.8 24.8 0 0 1 10 29C10 15.215 21.215 4 35 4s25 11.215 25 25c0 12.066-8.602 22.137-19.988 24.468"/><path fill="currentColor" d="M20.514 12.738c-.643.065-.351 2.021.177 1.965a12.8 12.8 0 0 1 10.237 3.725c.369.385 1.848-.926 1.398-1.389a14.78 14.78 0 0 0-11.812-4.301m18.56 5.69a12.81 12.81 0 0 1 10.236-3.725c.527.057.82-1.899.177-1.965a14.78 14.78 0 0 0-11.813 4.301c-.447.463 1.031 1.774 1.4 1.389m5.578 4.355c2.324-1.287 4.773-1.681 7.084-2.026a.5.5 0 0 0 .143-.938c-4.889-2.915-12.84-.583-14.252 5.599c-.09.384.27.625.687.582c5.292-.544 9.503.261 13.597 1.747c.381.139.805-.413.467-.819c-1.505-1.803-4.274-3.573-7.726-4.145m-26.531-2.965a.5.5 0 0 0 .144.938c2.312.346 4.761.739 7.085 2.026c-3.451.572-6.222 2.342-7.725 4.144c-.341.406.085.958.464.819c4.097-1.486 8.307-2.291 13.6-1.747c.417.043.774-.198.687-.582c-1.413-6.181-9.364-8.513-14.255-5.598"/></svg>`
    case value > 300:
      // ☠️ Berbahaya
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 xl:w-20 xl:h-20 2xl:w-30 2xl:h-30 3xl:w-35 3xl:h-35 text-zinc-950" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.5 11.25a1.75 1.75 0 1 0-3.5 0a1.75 1.75 0 0 0 3.5 0Zm6.5 0a1.75 1.75 0 1 0-3.5 0a1.75 1.75 0 0 0 3.5 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="m11 16l.293-.37c.333-.42.5-.63.707-.63s.374.21.707.63L13 16"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 2c-4.694 0-8.5 3.766-8.5 8.413c0 1.753.542 3.382 1.47 4.73c-.253.28-.407.648-.407 1.053c0 .871.713 1.578 1.593 1.578v1.219c0 .65.31 1.269.87 1.597c3.21 1.88 6.739 1.88 9.948 0c.56-.328.87-.948.87-1.597v-1.22c.88 0 1.593-.706 1.593-1.577c0-.405-.154-.774-.407-1.053a8.3 8.3 0 0 0 1.47-4.73C20.5 5.766 16.694 2 12 2m2 19.5V20m-4 1.5V20"/></g></svg>`
    default:
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 2xl:w-30 2xl:h-30 3xl:w-40 3xl:h-40 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <text x="12" y="16" font-size="10" text-anchor="middle" fill="currentColor">?</text>
        </svg>`
  }
}
</script>

<template>
  <div class="w-full bg-slate-900/70 rounded-xl flex flex-col pt-2 pb-4 min-h-full">
    <!-- <div></div> -->
    <p class="font-poppins text-lg 2xl:text-2xl font-semibold text-center mt-2">Kualitas Udara</p>
    <div class="border border-zinc-500 mt-4"></div>

    <!-- HEADER NILAI -->
    <div class="flex flex-row mt-4 gap-2">
      <div
        class="w-1/2 bg-slate-950 flex flex-col items-center justify-center font-poppins py-2 text-center"
      >
        <p class="font-semibold">Update</p>
        <p class="font-bold text-yellow-300">
          {{ `${DateFormatter.convertToDate(ispuLatestData?.tanggal)}` }}
        </p>
        <p class="font-bold text-yellow-300">
          {{ `${ispuLatestData?.jam}` }}
        </p>
      </div>
      <div
        class="w-1/2 bg-slate-950 flex flex-col items-center justify-center font-poppins py-2 text-center 3xl:text-xl"
      >
        <p class="font-semibold">Parameter Tertinggi</p>
        <p class="font-bold text-yellow-300">
          {{ maxIspu.param === 'pm25' ? 'PM2.5' : maxIspu.param.toUpperCase() }}
        </p>
      </div>
    </div>

    <!-- NILAI -->
    <div class="flex flex-row gap-2 mt-2 h-fit">
      <div class="w-1/2 items-center py-5 flex justify-center">
        <div
          class="rounded-full w-[17vh] h-[17vh] sm:h-[15vh] sm:w-[15vh] md:w-[17vw] md:h-[17vw] lg:w-[20vh] lg:h-[20vh] flex justify-center items-center"
          :class="generateColorIspu(maxIspu.value)"
        >
          <p
            class="font-poppins font-extrabold text-5xl sm:text-8xl md:text-6xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl text-center text-shadow-lg"
          >
            {{ maxIspu.value }}
          </p>
        </div>
      </div>

      <div class="w-1/2 flex flex-col items-center justify-center gap-2 p-2 text-center">
        <div v-html="generateIcon(maxIspu.value)" class="flex justify-center"></div>
        <p
          class="font-poppins font-bold text-xl sm:text-3xl xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-5xl"
        >
          {{ ispuLatestData?.status }}
        </p>
        <p
          class="font-poppins font-normal text-md xl:text-xs text-center 2xl:text-lg 3xl:text-sm 4xl:text-2xl"
        >
          {{ ispuLatestData?.ket }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.25rem;
  vertical-align: middle;
  color: #1f2937;
  border: 1px solid #f2f2f2;
  font-size: 0.875rem;
  width: fit-content;
  padding-inline: calc(0.75rem - 1px);
  background-size: auto;
  background-color: #ffffff; /* base-100 */
  height: 1.5rem;
}

.badge-error {
  --badge-color: #dc2626; /* error */
  --badge-fg: #ffffff; /* error-content */
  background-color: var(--badge-color);
  color: var(--badge-fg);
  border-color: var(--badge-color);
}

.badge-accent {
  --badge-color: #37cdbe; /* accent */
  --badge-fg: #163835; /* accent-content */
  background-color: var(--badge-color);
  color: var(--badge-fg);
  border-color: var(--badge-color);
}

.badge-success {
  --badge-color: #16a34a; /* success */
  --badge-fg: #ffffff; /* success-content */
  background-color: var(--badge-color);
  color: var(--badge-fg);
  border-color: var(--badge-color);
}
</style>
