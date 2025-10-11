<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiAccountMultiple,
  mdiChartTimelineVariant,
  mdiCalendar,
  mdiCalendarMonth,
  mdiLightbulbOutline,
  mdiWeatherDust,
  mdiSmog,
  mdiGasCylinder,
  mdiFlaskOutline,
  mdiMolecule,
  mdiMoleculeCo,
  mdiFactory,
  mdiCar,
  mdiWeatherCloudy,
} from '@mdi/js'
import * as chartConfig from '@/components/Charts/chart.config.js'
import SectionMain from '@/components/SectionMain.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableListPresence from '@/components/TableListPresence.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import CardName from '@/components/CardName.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CardGauge from '@/components/CardGauge.vue'
import CardWeather from '@/components/CardTemperature.vue'
import CardTemperature from '@/components/CardTemperature.vue'
import CardWind from '@/components/CardWind.vue'
import CardPressure from '@/components/CardPressure.vue'
import CardUv from '@/components/CardUv.vue'
import CardPrecip from '@/components/CardPrecip.vue'
import CardSolar from '@/components/CardSolar.vue'
import DateFormatter from '@/utils/DateFormatter'

const mainStore = useMainStore()
const summaryToday = ref({})

let intervalId = null
const fetchData = () => {
  mainStore.fetch30Minute('daily')
  summaryToday.value = mainStore.listDaily30Minute[0]
}

watch([() => mainStore.listDaily30Minute], ([newSummaryToday]) => {
  summaryToday.value = newSummaryToday[0]
})

onMounted(() => {
  fetchData() // fetch pertama kali saat page render

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
      <SectionTitleLineWithButton :icon="mdiSmog" title="Partikulat" class="-mt-10" />

      <div class="flex flex-col lg:flex-row w-full gap-4">
        <div class="flex flex-col h-fit w-full">
          <CardGauge class="" name="PM10" :value="Number(summaryToday?.pm10 || 0)" unit="µg/m³" />
        </div>
        <div class="flex flex-col h-fit w-full">
          <CardGauge class="" name="PM2.5" :value="Number(summaryToday?.pm25 || 0)" unit="µg/m³" />
        </div>
      </div>

      <SectionTitleLineWithButton :icon="mdiGasCylinder" title="Gas (µg/m³)" class="" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-5 mb-3 font-poppins">
        <CardBoxWidget
          class="h-fit"
          color="text-violet-500"
          :icon="mdiFlaskOutline"
          :number="Number(summaryToday?.hc || 0)"
          label="HC"
        />
        <CardBoxWidget
          class="h-fit"
          color="text-slate-500"
          :icon="mdiMoleculeCo"
          :number="Number(summaryToday?.co || 0)"
          label="CO"
        />
        <CardBoxWidget
          class="h-fit"
          color="text-sky-500"
          :icon="mdiMolecule"
          :number="Number(summaryToday?.o3 || 0)"
          label="O3"
        />
        <CardBoxWidget
          class="h-fit"
          color="text-amber-500"
          :icon="mdiFactory"
          :number="Number(summaryToday?.so2 || 0)"
          label="SO2"
        />
        <CardBoxWidget
          class="h-fit"
          color="text-rose-500"
          :icon="mdiCar"
          :number="Number(summaryToday?.no2 || 0)"
          label="NO2"
        />
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

      <!-- <div
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-4 mt-2"
        v-if="totalPresenceToday > 0"
      >
        <CardName
          v-for="(item, index) in dataPresenceToday"
          :key="index"
          :name="item.nama"
          :check-in="item.waktu_masuk"
          :last-update="item.terakhir_terlihat"
        />
      </div> -->

      <!-- <CardBox v-else>
        <CardBoxComponentEmpty text="Belum ada yang absen nih..." />
      </CardBox> -->
      <!-- 

      <CardBox has-table v-if="totalPresenceToday > 0">
        <TableListPresence :data="dataPresenceToday" />
      </CardBox> -->

      <!-- <CardBox>
        <CardBoxComponentEmpty text="Belum ada yang absen nih..." />
      </CardBox> -->

      <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            v-for="(transaction, index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div>
      </div> -->

      <!-- <SectionBannerStarOnGitHub class="mt-6 mb-6" /> -->

      <!-- <SectionTitleLineWithButton :icon="mdiChartPie" title="Trends overview">
        <BaseButton :icon="mdiReload" color="whiteDark" @click="fillChartData" />
      </SectionTitleLineWithButton> -->

      <!-- <CardBox class="mb-6">
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox> -->

      <!-- <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
