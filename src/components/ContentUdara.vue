<script setup>
import { useMainStore } from '@/stores/main'
// import LineChart from './LineChart.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import DateFormatter from '@/utils/DateFormatter'
import IspuChart from './Charts/IspuChart.vue'

let intervalId = null
const mainStore = useMainStore()
const ispuLatestData = ref({
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
const listPm10 = ref([])
const listPm25 = ref([])
const maxDailyPm10 = ref(0)
const minDailyPm10 = ref(0)
const avgDailyPm10 = ref(0)
const maxDailyPm25 = ref(0)
const minDailyPm25 = ref(0)
const avgDailyPm25 = ref(0)
const maxIspu = ref({ param: '-', value: 0 })

const fetchData = async () => {
  await mainStore.fetchIspuLatest()
  ispuLatestData.value = mainStore.ispuLatest

  mainStore.fetchIspuDaily('pm10')
  listPm10.value = mainStore.listIspuPM10

  mainStore.fetchIspuDaily('pm25')
  listPm25.value = mainStore.listIspuPM25

  if (ispuLatestData.value) {
    maxIspu.value = getMaxIspu(ispuLatestData.value)
  }

  if (listPm10.value.length > 0) {
    const statsPm10 = getIspuStats(listPm10.value, 'pm10')
    maxDailyPm10.value = statsPm10.max
    minDailyPm10.value = statsPm10.min
    avgDailyPm10.value = statsPm10.avg
  }

  if (listPm25.value.length > 0) {
    const statsPm25 = getIspuStats(listPm25.value, 'pm25')
    maxDailyPm25.value = statsPm25.max
    minDailyPm25.value = statsPm25.min
    avgDailyPm25.value = statsPm25.avg
  }
}

onMounted(async () => {
  fetchData()

  intervalId = setInterval(() => {
    fetchData()
    // console.log('interval running')
  }, 300000) //5 menit sekali
})

watch(
  [() => mainStore.ispuLatest, () => mainStore.listIspuPM10, () => mainStore.listIspuPM25],
  ([newIspuLatest, newListIspuPm10, newListIspuPm25]) => {
    if (newIspuLatest) {
      ispuLatestData.value = newIspuLatest
      maxIspu.value = getMaxIspu(newIspuLatest)
    }

    if (newListIspuPm10) {
      listPm10.value = newListIspuPm10
      const statsPm10 = getIspuStats(newListIspuPm10, 'pm10')
      maxDailyPm10.value = statsPm10.max
      minDailyPm10.value = statsPm10.min
      avgDailyPm10.value = statsPm10.avg
    }

    if (newListIspuPm25) {
      listPm25.value = newListIspuPm25
      const statsPm25 = getIspuStats(newListIspuPm25, 'pm25')
      maxDailyPm25.value = statsPm25.max
      minDailyPm25.value = statsPm25.min
      avgDailyPm25.value = statsPm25.avg
    }
  },
)

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

function getMaxIspu(data) {
  const keys = ['pm25', 'pm10', 'so2', 'no2', 'co', 'o3', 'hc']
  const maxParam = keys.reduce((a, b) => (Number(data[a]) > Number(data[b]) ? a : b))
  return { param: maxParam, value: Number(data[maxParam]) }
}

function getIspuStats(data, key = 'pm25') {
  const values = data.map((item) => Number(item[key])).filter((val) => !isNaN(val))

  if (values.length === 0) return { max: 0, min: 0, avg: 0 }

  const max = Math.max(...values)
  const min = Math.min(...values)
  const avg = values.reduce((a, b) => a + b, 0) / values.length

  return { max, min, avg: Number(avg.toFixed(2)) }
}

function generateColorIspu(value) {
  switch (true) {
    case value >= 0 && value <= 50:
      return 'bg-emerald-400'
    case value > 51 && value <= 100:
      return 'bg-blue-400'
    case value > 101 && value <= 200:
      return 'bg-amber-400'
    case value > 201 && value <= 300:
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
      return '😇'
    case value > 51 && value <= 100:
      return '😐'
    case value > 101 && value <= 200:
      return '😷'
    case value > 201 && value <= 300:
      return '🤧'
    case value > 300:
      return '☠️'
    default:
      return 'ICON'
  }
}

const bars = computed(() => [
  { label: 'PM10', value: ispuLatestData.value.pm10 ?? 0 },
  { label: 'PM2.5', value: ispuLatestData.value.pm25 ?? 0 },
  { label: 'SO2', value: ispuLatestData.value.so2 ?? 0 },
  { label: 'CO', value: ispuLatestData.value.co ?? 0 },
  { label: 'O3', value: ispuLatestData.value.o3 ?? 0 },
  { label: 'NO2', value: ispuLatestData.value.no2 ?? 0 },
  { label: 'HC', value: ispuLatestData.value.hc ?? 0 },
])
</script>

<template>
  <div
    class="w-full md:col-span-2 lg:w-[35vw] bg-dlh_blue rounded-xl flex flex-col pt-2 pb-4 h-full"
  >
    <!-- <div></div> -->
    <p class="font-poppins text-lg font-semibold text-center mt-2">Kualitas Udara</p>
    <div class="border border-zinc-500 mt-4"></div>

    <!-- HEADER NILAI -->
    <div class="flex flex-row mt-1 gap-2">
      <div
        class="w-1/2 bg-dlh_blue_dark flex flex-col items-center justify-center font-poppins py-2 text-center"
      >
        <p class="font-semibold">Update</p>
        <p class="font-bold text-yellow-300">
          {{ `${DateFormatter.convertToDate(ispuLatestData?.tanggal)} ${ispuLatestData?.jam}` }}
        </p>
      </div>
      <div
        class="w-1/2 bg-dlh_blue_dark flex flex-col items-center justify-center font-poppins py-2 text-center"
      >
        <p class="font-semibold">Parameter Tertinggi</p>
        <p class="font-bold text-yellow-300">
          {{ maxIspu.param === 'pm25' ? 'PM2.5' : maxIspu.param.toUpperCase() }}
        </p>
      </div>
    </div>

    <!-- NILAI -->
    <div class="flex flex-row gap-2">
      <div class="w-1/2 items-center py-5 flex justify-center">
        <div
          class="rounded-full h-[20vh] w-[20vh] sm:h-[15vh] sm:w-[15vh] flex justify-center items-center"
          :class="generateColorIspu(maxIspu.value)"
        >
          <p class="font-poppins font-extrabold text-6xl text-center text-shadow-lg">
            {{ maxIspu.value }}
          </p>
        </div>
      </div>

      <div class="w-1/2 flex flex-col items-center justify-center gap-2 p-2">
        <p class="text-4xl sm:text-6xl">{{ generateIcon(maxIspu.value) }}</p>
        <p class="font-poppins font-bold text-xl sm:text-3xl">{{ ispuLatestData?.status }}</p>
        <p class="font-poppins font-normal text-xs text-center">{{ ispuLatestData?.ket }}</p>
      </div>
    </div>

    <div class="mt-4">
      <div
        class="w-full h-full bg-dlh_blue_dark p-2 sm:p-4 font-poppins items-center flex flex-col gap-2"
      >
        <p class="font-bold">Indeks Standar Pencemaran Udara</p>
        <div class="w-full h-full flex gap-3 sm:gap-4">
          <IspuChart :dataIspu="bars" />
        </div>
      </div>
    </div>

    <!-- GRAPH PM10 -->
    <!-- <div class="h-full">
      <div class="w-full bg-dlh_blue_dark p-4 font-poppins">
        <div class="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
          <p class="font-bold text-sm">ISPU PM10 <span class="font-normal">(24 Jam)</span></p>
          <div class="flex flex-row gap-4 font-bold text-xs whitespace-nowrap">
            <div class="badge badge-error">MAX: {{ maxDailyPm10 }}</div>
            <div class="badge badge-accent">MIN: {{ minDailyPm10 }}</div>
            <div class="badge badge-success">AVG: {{ avgDailyPm10 }}</div>
          </div>
        </div>
        <div class="mt-4 sm:mt-0">
          <LineChart param="pm10" :listData="listPm10" />
        </div>
      </div>
      <div class="w-full bg-dlh_blue_dark p-4 font-poppins mt-4">
        <div class="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
          <p class="font-bold text-sm">ISPU PM2.5 <span class="font-normal">(24 Jam)</span></p>
          <div class="flex flex-row gap-4 font-bold text-xs whitespace-nowrap">
            <div class="badge badge-error">MAX: {{ maxDailyPm25 }}</div>
            <div class="badge badge-accent">MIN: {{ minDailyPm25 }}</div>
            <div class="badge badge-success">AVG: {{ avgDailyPm25 }}</div>
          </div>
        </div>
        <div class="mt-4 sm:mt-0">
          <LineChart param="pm25" :listData="listPm25" />
        </div>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* 8px */
  border-radius: 0.25rem; /* sesuaikan sesuai kebutuhan */
  vertical-align: middle;
  color: #1f2937; /* base-content */
  border: 1px solid #f2f2f2; /* base-200 */
  font-size: 0.875rem; /* 14px */
  width: fit-content;
  padding-inline: calc(0.75rem - 1px);
  background-size: auto;
  background-color: #ffffff; /* base-100 */
  height: 1.5rem; /* contoh ukuran */
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
