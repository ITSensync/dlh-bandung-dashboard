<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import { useMainStore } from '@/stores/main'
import Export from '@/utils/Export'
// import Export from '@/utils/Export'
import { reactive } from 'vue'

const formHarian = reactive({
  date: '',
})
const formBulanan = reactive({
  month: '',
  year: '',
})
const formTahunan = reactive({
  year: '',
})

const mainStore = useMainStore()

// HARIAN
async function handleSubmitHarian() {
  if (!formHarian.date) return alert('Tanggal harus diisi!')

  const result = await mainStore.fetchReportIspuDaily(formHarian.date)
  Export.ispuHarian(result.data, formHarian.date)
}

function handleResetHarian() {
  formHarian.date = ''
}

// BULANAN
async function handleSubmitBulanan() {
  if (!formBulanan.month || !formBulanan.year) return alert('Lengkapi semua field Bulanan!')

  const result = await mainStore.fetchReportIspuMonthly(formBulanan.month, formBulanan.year)
  Export.ispuBulanan(result.data, result.periode)
}

function handleResetBulanan() {
  formBulanan.month = ''
  formBulanan.year = '2025'
}

// TAHUNAN
async function handleSubmitTahunan() {
  if (!formTahunan.year) return alert('Lengkapi semua field Tahunan!')

  const result = await mainStore.fetchReportIspuYearly(formTahunan.year)

  Export.ispuTahunan(result.data, result.tahun)
}

function handleResetTahunan() {
  formTahunan.year = ''
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
  </div>
</template>
