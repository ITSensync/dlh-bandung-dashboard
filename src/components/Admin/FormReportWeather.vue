<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import { useMainStore } from '@/stores/main'
import Export from '@/utils/Export'
import { reactive } from 'vue'

const formHarian = reactive({
  date: '',
})
const formBulanan = reactive({
  month: '',
  year: '',
  sensor: '',
})
const formMingguan = reactive({
  week: '',
  month: '',
  year: '',
})

const mainStore = useMainStore()

// HARIAN
async function handleSubmitHarian() {
  if (!formHarian.date) return alert('Tanggal harus diisi!')

  const result = await mainStore.fetchReportWeatherDaily(formHarian.date)
  Export.cuacaHarian(result.data, result.statistik, formHarian.date)
}

function handleResetHarian() {
  formHarian.date = ''
}

// BULANAN
async function handleSubmitBulanan() {
  if (!formBulanan.month || !formBulanan.year) return alert('Lengkapi semua field Bulanan!')
  const result = await mainStore.fetchReportWeatherMonthly(
    formBulanan.month,
    formBulanan.year,
    formBulanan.sensor,
  )
  Export.cuacaBulanan(result.data, result.bulan, result.tahun, result.parameter)
}

function handleResetBulanan() {
  formBulanan.month = ''
  formBulanan.year = ''
}

// Mingguan
async function handleSubmitMingguan() {
  if (!formMingguan.year || !formMingguan.week || !formMingguan.month)
    return alert('Lengkapi semua field Mingguann!')

    const result = await mainStore.fetchReportWeatherWeekly(
    formMingguan.week,
    formMingguan.month,
    formMingguan.year,
  )

  Export.cuacaMingguan(result.data, result.periode)
}

function handleResetMingguan() {
  formMingguan.year = ''
  formMingguan.week = ''
  formMingguan.month = ''
}

const monthOptions = [
  { id: 1, label: 'Januari', value: '01' },
  { id: 2, label: 'Februari', value: '02' },
  { id: 3, label: 'Maret', value: '03' },
  { id: 4, label: 'April', value: '04' },
  { id: 5, label: 'Mei', value: '05' },
  { id: 6, label: 'Juni', value: '06' },
  { id: 7, label: 'Juli', value: '07' },
  { id: 8, label: 'Agustus', value: '08' },
  { id: 9, label: 'September', value: '09' },
  { id: 10, label: 'Oktober', value: '10' },
  { id: 11, label: 'November', value: '11' },
  { id: 12, label: 'Desember', value: '12' },
]

const yearOptions = [
  { id: 1, label: '2025', value: '2025' },
  { id: 2, label: '2026', value: '2026' },
  { id: 3, label: '2027', value: '2027' },
  { id: 4, label: '2028', value: '2028' },
]

const sensorOptions = [
  {
    id: 1,
    label: 'Kec. Angin',
    value: 'ws',
  },
  {
    id: 2,
    label: 'Arah Angin',
    value: 'wd',
  },
  {
    id: 3,
    label: 'Kelembapan',
    value: 'humidity',
  },
  {
    id: 4,
    label: 'Suhu',
    value: 'temperature',
  },
  {
    id: 5,
    label: 'Tekanan',
    value: 'pressure',
  },
  {
    id: 6,
    label: 'Curah Hujan',
    value: 'rain_intensity',
  },
  {
    id: 7,
    label: 'Solar Radiasi',
    value: 'sr',
  },
  {
    id: 8,
    label: 'UV',
    value: 'uv',
  },
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <!-- HARIAN -->
    <CardBox>
      <component :is="'form'" class="font-poppins" @submit.prevent="handleSubmitHarian">
        <div class="flex flex-col items-end gap-5">
          <FormField label="Harian" class="w-full">
            <FormControl
              label="Tanggal"
              v-model="formHarian.date"
              type="date"
              placeholder="Tanggal"
              required
            ></FormControl>
          </FormField>
          <div class="w-full sm:w-fit gap-4 flex flex-col sm:flex-row justify-end -mt-5">
            <BaseButton
              type="reset"
              color="danger"
              outline
              label="Reset"
              :onclick="handleResetHarian"
            />
            <BaseButton type="submit" color="info" label="Download" />
          </div>
        </div>
      </component>
    </CardBox>

    <!-- MINGGUAN -->
    <CardBox>
      <component :is="'form'" class="font-poppins" @submit.prevent="handleSubmitMingguan">
        <div class="flex flex-col items-end gap-5">
          <FormField label="Mingguan" class="w-full">
            <FormControl
              label="Minggu ke - "
              type="select"
              v-model="formMingguan.week"
              placeholder="Pilih minggu"
              :options="[
                {
                  id: 1,
                  label: '1',
                  value: '1',
                },
                {
                  id: 2,
                  label: '2',
                  value: '2',
                },
                {
                  id: 3,
                  label: '3',
                  value: '3',
                },
                {
                  id: 4,
                  label: '4',
                  value: '4',
                },
                {
                  id: 5,
                  label: '5',
                  value: '5',
                },
              ]"
            ></FormControl>
            <FormControl
              label="Bulan"
              type="select"
              v-model="formMingguan.month"
              placeholder="Pilih Bulan"
              :options="monthOptions"
            ></FormControl>
            <FormControl
              label="Tahun"
              type="select"
              v-model="formMingguan.year"
              placeholder="Pilih Tahun"
              :options="yearOptions"
            ></FormControl>
          </FormField>
          <div class="w-full sm:w-fit gap-4 flex flex-col sm:flex-row justify-end -mt-5">
            <BaseButton
              type="reset"
              color="danger"
              outline
              label="Reset"
              :onclick="handleResetMingguan"
            />
            <BaseButton type="submit" color="info" label="Download" />
          </div>
        </div>
      </component>
    </CardBox>

    <!-- BULANAN -->
    <CardBox>
      <component :is="'form'" class="font-poppins" @submit.prevent="handleSubmitBulanan">
        <div class="flex flex-col items-end gap-5">
          <FormField label="Bulanan" class="w-full">
            <FormControl
              label="Bulan"
              type="select"
              v-model="formBulanan.month"
              :options="monthOptions"
              placeholder="Pilih Bulan"
              required
            ></FormControl>
            <FormControl
              label="Tahun"
              type="select"
              v-model="formBulanan.year"
              placeholder="Pilih Tahun"
              :options="yearOptions"
            ></FormControl>
            <FormControl
              label="Parameter"
              type="select"
              v-model="formBulanan.sensor"
              placeholder="Pilih Parameter"
              :options="sensorOptions"
            ></FormControl>
          </FormField>
          <div class="w-full sm:w-fit gap-4 flex flex-col sm:flex-row justify-end -mt-5">
            <BaseButton
              type="reset"
              color="danger"
              outline
              label="Reset"
              :onclick="handleResetBulanan"
            />
            <BaseButton type="submit" color="info" label="Download" />
          </div>
        </div>
      </component>
    </CardBox>

    <!-- TAHUNAN -->
  </div>
</template>
