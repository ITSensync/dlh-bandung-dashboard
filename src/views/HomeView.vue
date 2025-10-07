<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiAccountMultiple, mdiChartTimelineVariant, mdiCalendar, mdiCalendarMonth } from '@mdi/js'
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

const chartData = ref(null)

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

const mainStore = useMainStore()
const totalPresenceToday = ref(0)
const totalPresenceMonthly = ref(0)
const dataPresenceToday = ref([])

// onMounted(() => {
//   fillChartData()
// })
let intervalId = null
const dateNow = new Date()
const currentMonth = dateNow.toISOString().slice(0, 7)
const fetchData = () => {
  mainStore.fetchPresenceToday()
  mainStore.fetchPresenceMonthly(currentMonth)
}

watch(
  [() => mainStore.presenceToday, () => mainStore.presenceMonthly],
  ([newToday, newMonthly]) => {
    totalPresenceToday.value = newToday.length
    totalPresenceMonthly.value = newMonthly.reduce((sum, item) => sum + item.jumlah_hadir, 0)
    dataPresenceToday.value = newToday
  },
)

onMounted(() => {
  fetchData() // fetch pertama kali saat page render

  // ulangi setiap 5 menit (300000 ms)
  intervalId = setInterval(() => {
    fetchData()
  }, 120000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

/* const clientBarItems = computed(() => mainStore.clients.slice(0, 4))

const transactionBarItems = computed(() => mainStore.history) */
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Overview" class="-mt-10" />

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-3">
        <CardBoxWidget
          class="h-fit"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="12"
          label="Karyawan"
        />
        <CardBoxWidget
          class="h-fit"
          color="text-blue-500"
          :icon="mdiCalendar"
          :number="totalPresenceToday"
          label="Rekap Hari Ini"
        />
        <CardBoxWidget
          class="h-fit"
          color="text-red-500"
          :icon="mdiCalendarMonth"
          :number="totalPresenceMonthly"
          label="Rekap Bulanan"
        />
      </div> -->

      <SectionTitleLineWithButton
        :icon="mdiAccountMultiple"
        title="Absensi Hari Ini"
        class="-mt-10"
      />

      <div
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
      </div>

      <CardBox v-else>
        <CardBoxComponentEmpty text="Belum ada yang absen nih..." />
      </CardBox>
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
