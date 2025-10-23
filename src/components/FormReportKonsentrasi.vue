<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import { useMainStore } from '@/stores/main'
// import Export from '@/utils/Export'
import { onMounted, reactive, ref, watch } from 'vue'

const formHarian = reactive({
  date: '',
})
const formMingguan = reactive({
  week: '',
  month: '',
  year: '',
})
const formBulanan = reactive({
  month: '',
  year: '',
  param: '',
})
const formTahunan = reactive({
  year: '',
  param: '',
})
const formAvgBulan = reactive({
  month: '',
  year: '',
})
const formAvgTahun = reactive({
  year: '',
})

const mainStore = useMainStore()
const tableData = ref([])

onMounted(() => {
  mainStore.fetch30Minute('daily')
  tableData.value = mainStore.listDaily30Minute
})

watch(
  () => mainStore.listDaily30Minute,
  (newVal) => {
    tableData.value = newVal
  },
)

// ==================================================
//  HANDLER UNTUK SETIAP FORM
// ==================================================

// HARIAN
function handleSubmitHarian() {
  if (!formHarian.date) return alert('Tanggal harus diisi!')
  console.log('Download Harian:', formHarian)
  mainStore.fetch30Minute('daily', formHarian.date)
}

function handleResetHarian() {
  formHarian.date = ''
}

// MINGGUAN
function handleSubmitMingguan() {
  if (!formMingguan.week || !formMingguan.month || !formMingguan.year)
    return alert('Lengkapi semua field Mingguan!')
  console.log('Download Mingguan:', formMingguan)
  //   mainStore.fetch30Minute('weekly', formMingguan)
}

function handleResetMingguan() {
  formMingguan.week = ''
  formMingguan.month = ''
  formMingguan.year = ''
}

// BULANAN
function handleSubmitBulanan() {
  if (!formBulanan.month || !formBulanan.year || !formBulanan.param)
    return alert('Lengkapi semua field Bulanan!')
  console.log('Download Bulanan:', formBulanan)
  //   mainStore.fetch30Minute('monthly', formBulanan)
}

function handleResetBulanan() {
  formBulanan.month = ''
  formBulanan.year = ''
  formBulanan.param = ''
}

// TAHUNAN
function handleSubmitTahunan() {
  if (!formTahunan.year || !formTahunan.param) return alert('Lengkapi semua field Tahunan!')
  console.log('Download Tahunan:', formTahunan)
  //   mainStore.fetch30Minute('yearly', formTahunan)
}

function handleResetTahunan() {
  formTahunan.year = ''
  formTahunan.param = ''
}

// AVG BULANAN
function handleSubmitAvgBulan() {
  if (!formAvgBulan.month || !formAvgBulan.year)
    return alert('Lengkapi semua field Rata-Rata Bulanan!')
  console.log('Download Rata-rata Bulanan:', formAvgBulan)
  //   mainStore.fetch30Minute('avg-monthly', formAvgBulan)
}

function handleResetAvgBulan() {
  formAvgBulan.month = ''
  formAvgBulan.year = ''
}

// AVG TAHUNAN
function handleSubmitAvgTahun() {
  if (!formAvgTahun.year) return alert('Tahun harus diisi!')
  console.log('Download Rata-rata Tahunan:', formAvgTahun)
  //   mainStore.fetch30Minute('avg-yearly', formAvgTahun)
}

function handleResetAvgTahun() {
  formAvgTahun.year = ''
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

/* function handleBtnExcel() {
  Export.exportToExcel(tableData.value, `30Menit_${form.startDate}-${form.endDate}.xlsx`)
} */
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
              label="Minggu Ke -"
              type="select"
              v-model="formMingguan.week"
              placeholder="Pilih Minggu"
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
              required
            ></FormControl>
            <FormControl
              label="Bulan"
              type="select"
              :options="monthOptions"
              v-model="formMingguan.month"
              placeholder="Pilih Bulan"
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
              :options="monthOptions"
              v-model="formBulanan.month"
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
              v-model="formBulanan.param"
              placeholder="Pilih Parameter"
              :options="[
                {
                  id: 1,
                  label: 'PM₁₀',
                  value: 'pm10',
                },
                {
                  id: 2,
                  label: 'PM₂.₅',
                  value: 'pm25',
                },
                {
                  id: 3,
                  label: 'HC',
                  value: 'hc',
                },
                {
                  id: 4,
                  label: 'CO',
                  value: 'co',
                },
                {
                  id: 5,
                  label: 'O₃',
                  value: 'o3',
                },
                {
                  id: 6,
                  label: 'SO₂',
                  value: 'so2',
                },
                {
                  id: 7,
                  label: 'NO₂',
                  value: 'no2',
                },
              ]"
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
    <CardBox>
      <component :is="'form'" class="font-poppins" @submit.prevent="handleSubmitTahunan">
        <div class="flex flex-col items-end gap-5">
          <FormField label="Tahunan" class="w-full">
            <FormControl
              label="Tahun"
              type="select"
              v-model="formTahunan.year"
              placeholder="Pilih Tahun"
              :options="yearOptions"
            ></FormControl>
            <FormControl
              label="Parameter"
              type="select"
              v-model="formTahunan.param"
              placeholder="Pilih Parameter"
              :options="[
                {
                  id: 1,
                  label: 'PM₁₀',
                  value: 'pm10',
                },
                {
                  id: 2,
                  label: 'PM₂.₅',
                  value: 'pm25',
                },
                {
                  id: 3,
                  label: 'HC',
                  value: 'hc',
                },
                {
                  id: 4,
                  label: 'CO',
                  value: 'co',
                },
                {
                  id: 5,
                  label: 'O₃',
                  value: 'o3',
                },
                {
                  id: 6,
                  label: 'SO₂',
                  value: 'so2',
                },
                {
                  id: 7,
                  label: 'NO₂',
                  value: 'no2',
                },
              ]"
            ></FormControl>
          </FormField>
          <div class="w-full sm:w-fit gap-4 flex flex-col sm:flex-row justify-end -mt-5">
            <BaseButton
              type="reset"
              color="danger"
              outline
              label="Reset"
              :onclick="handleResetTahunan"
            />
            <BaseButton type="submit" color="info" label="Download" />
          </div>
        </div>
      </component>
    </CardBox>

    <!-- AVG BULANAN -->
    <CardBox>
      <component :is="'form'" class="font-poppins" @submit.prevent="handleSubmitAvgBulan">
        <div class="flex flex-col items-end gap-5">
          <FormField label="Rata-Rata Bulanan" class="w-full">
            <FormControl
              label="Bulan"
              type="select"
              :options="monthOptions"
              v-model="formAvgBulan.month"
              placeholder="Pilih Bulan"
              required
            ></FormControl>
            <FormControl
              label="Tahun"
              type="select"
              v-model="formAvgBulan.year"
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
              :onclick="handleResetAvgBulan"
            />
            <BaseButton type="submit" color="info" label="Download" />
          </div>
        </div>
      </component>
    </CardBox>

    <!-- AVG TAHUNAN -->
    <CardBox>
      <component :is="'form'" class="font-poppins" @submit.prevent="handleSubmitAvgTahun">
        <div class="flex flex-col items-end gap-5">
          <FormField label="Rata-Rata Tahunan" class="w-full">
            <FormControl
              label="Tahun"
              v-model="formAvgTahun.year"
              type="select"
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
              :onclick="handleResetAvgTahun"
            />
            <BaseButton type="submit" color="info" label="Download" />
          </div>
        </div>
      </component>
    </CardBox>
  </div>
</template>
