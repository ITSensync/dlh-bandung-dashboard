<script setup>
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiSmog, mdiGasCylinder, mdiWeatherCloudy, mdiGauge } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
// import CardBoxWidget from '@/components/CardBoxWidget.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { useAuthStore } from '@/stores/auth'
import CardIspu from '@/components/Admin/CardIspu.vue'
import CardIspuIcon from '@/components/Admin/CardIspuIcon.vue'

const CardGauge = defineAsyncComponent(() => import('@/components/Admin/CardGauge.vue'))
const CardTemperature = defineAsyncComponent(() => import('@/components/Admin/CardTemperature.vue'))
const CardWind = defineAsyncComponent(() => import('@/components/Admin/CardWind.vue'))
const CardPressure = defineAsyncComponent(() => import('@/components/Admin/CardPressure.vue'))
const CardPrecip = defineAsyncComponent(() => import('@/components/Admin/CardPrecip.vue'))
const CardUv = defineAsyncComponent(() => import('@/components/Admin/CardUv.vue'))
const CardSolar = defineAsyncComponent(() => import('@/components/Admin/CardSolar.vue'))

const mainStore = useMainStore()
const authStore = useAuthStore()
const summaryToday = ref({})

let intervalId = null
const fetchData = () => {
  mainStore.fetch30Minute('daily')
  mainStore.fetchIspuLatest()
  summaryToday.value = mainStore.listDaily30Minute[0]
}
const role = computed(() => authStore.role)

watch([() => mainStore.listDaily30Minute], ([newSummaryToday]) => {
  summaryToday.value = newSummaryToday[0]
})

onMounted(() => {
  authStore.initialize()
  fetchData()

  // ulangi setiap 2 menit (300000 ms)
  intervalId = setInterval(() => {
    fetchData()
  }, 120000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiGauge" title="ISPU" class="-mt-10" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardIspu />
        <CardIspuIcon />
      </div>

      <SectionTitleLineWithButton :icon="mdiSmog" title="Partikulat" class="" />

      <div class="flex flex-col lg:flex-row w-full gap-4">
        <div class="flex flex-col h-fit w-full">
          <CardGauge
            class=""
            name="PM10"
            :value="Number(summaryToday?.pm10 || 0)"
            unit="µg/m³"
            :role="role"
          />
        </div>
        <div class="flex flex-col h-fit w-full">
          <CardGauge
            class=""
            name="PM2.5"
            :value="Number(summaryToday?.pm25 || 0)"
            unit="µg/m³"
            :role="role"
          />
        </div>
      </div>

      <SectionTitleLineWithButton :icon="mdiGasCylinder" title="Gas (µg/m³)" class="" />

      <div class="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 w-full gap-4 mb-3 font-poppins">
        <CardGauge
          class=""
          name="HC"
          :value="Number(summaryToday?.hc || 0)"
          unit="µg/m³"
          :role="role"
        />
        <CardGauge
          class=""
          name="CO"
          :value="Number(summaryToday?.co || 0)"
          unit="µg/m³"
          :role="role"
        />
        <CardGauge
          class="lg:col-span-2 xl:col-auto"
          name="O<sub>3</sub>"
          :value="Number(summaryToday?.o3 || 0)"
          unit="µg/m³"
          :role="role"
        />
        <div class="flex flex-col lg:flex-row gap-4 w-full md:col-end-2 lg:col-span-3">
          <CardGauge
            class=""
            name="NO<sub>2</sub>"
            :value="Number(summaryToday?.no2 || 0)"
            unit="µg/m³"
            :role="role"
          />
          <CardGauge
            class=""
            name="SO<sub>2</sub>"
            :value="Number(summaryToday?.so2 || 0)"
            unit="µg/m³"
            :role="role"
          />
        </div>

        <!-- <CardBoxWidget
          class="h-fit"
          color="text-violet-500"
          :icon="role == 'admin' ? mdiFlaskOutline : ''"
          :number="Number(summaryToday?.hc || 0)"
          label="HC"
        />
        <CardBoxWidget
          class="h-fit"
          color="text-slate-500"
          :icon="role == 'admin' ? mdiMoleculeCo : ''"
          :number="Number(summaryToday?.co || 0)"
          label="CO"
        />
        <CardBoxWidget
          class="h-fit"
          color="text-sky-500"
          :icon="role == 'admin' ? mdiMolecule : ''"
          :number="Number(summaryToday?.o3 || 0)"
          label="O³"
        />
        <CardBoxWidget
          class="h-fit"
          color="text-amber-500"
          :icon="role == 'admin' ? mdiFactory : ''"
          :number="Number(summaryToday?.so2 || 0)"
          label="SO²"
        />
        <CardBoxWidget
          class="h-fit"
          color="text-rose-500"
          :icon="role == 'admin' ? mdiCar : ''"
          :number="Number(summaryToday?.no2 || 0)"
          label="NO²"
        /> -->
      </div>

      <SectionTitleLineWithButton :icon="mdiWeatherCloudy" title="Cuaca" class="" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardTemperature
          :suhu="Number(summaryToday?.temp || 0)"
          :humd="Number(summaryToday?.humd || 0)"
        />
        <CardWind :degrees="Number(summaryToday?.wd || 0)" :speed="Number(summaryToday?.ws || 0)" />
        <CardPressure :press="Number(summaryToday?.press || 0)" />
        <CardPrecip :water-level="Number(summaryToday?.rain || 0)" />
        <CardUv :solarRadiation="Number(summaryToday?.uv || 0)" />
        <CardSolar :val="Number(summaryToday?.solar) || 0" />
      </div>
      <!-- <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4" v-else>
        <CardBoxWidget
          class="h-fit"
          :number="Number(summaryToday?.temp || 0)"
          suffix=" °C"
          label="Suhu"
        />
        <CardBoxWidget
          class="h-fit"
          :number="Number(summaryToday?.humd || 0)"
          suffix=" %"
          label="Kelembapan"
        />
        <CardBoxWidget
          class="h-fit"
          :number="Number(summaryToday?.humd || 0)"
          suffix=" °"
          label="Arah Angin"
        />
        <CardBoxWidget
          class="h-fit"
          :number="Number(summaryToday?.humd || 0)"
          suffix=" m/s"
          label="Kec. Angin"
        />
        <CardBoxWidget
          class="h-fit"
          :number="Number(summaryToday?.humd || 0)"
          suffix=" mBar"
          label="Tekanan"
        />
        <CardBoxWidget
          class="h-fit"
          :number="Number(summaryToday?.humd || 0)"
          suffix=" mm/jam"
          label="Curah Hujan"
        />
        <CardBoxWidget
          class="h-fit"
          :number="Number(summaryToday?.humd || 0)"
          suffix=" W/m²"
          label="Solar radiasi"
        />
        <CardBoxWidget
          class="h-fit"
          :number="Number(summaryToday?.humd || 0)"
          suffix=" index"
          label="UV"
        />
      </div> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
