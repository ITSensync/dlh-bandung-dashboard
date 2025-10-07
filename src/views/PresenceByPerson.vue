<script setup>
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableListPresencePerson from '@/components/TableListPresencePerson.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useMainStore } from '@/stores/main'
import Export from '@/utils/Export'
import { mdiAccountTie, mdiFileExcel, mdiTable } from '@mdi/js'
import { reactive, ref, watch } from 'vue'

const selectOptions = [
  { id: 'f0-62-5a-c0-c0-71', label: 'Alief' },
  { id: '7C-2A-DB-A5-58-AA', label: 'Beben' },
  { id: 'b4-9d-02-f5-c2-33', label: 'Bijak' },
  { id: '8c-34-01-d4-6c-ad', label: 'Candra' },
  { id: '94-54-ce-27-35-4b', label: 'Faisal' },
  { id: 'bc-2d-ef-a2-de-1f', label: 'Lutfi' },
  { id: 'ec-30-b3-9d-82-a3', label: 'Nasrul' },
  { id: 'c8-90-8a-cd-15-47', label: 'Shofi' },
  { id: '4e-22-61-08-0b-88', label: 'Wahyuni' },
  { id: '88-5a-06-62-26-a3', label: 'Irvan' },
  { id: '8c-93-8b-26-8a-3b', label: 'Irvan Baru' },
  { id: '4e-af-bc-ac-e1-8f', label: 'Selli Lama' },
  { id: '32-d2-ca-6b-eb-de', label: 'Selli Baru' },
  { id: 'f0-c3-71-d0-09-74', label: 'Selli Baru 2' },
]

const isLoading = ref(false)
const mainStore = useMainStore()
const form = reactive({
  name: '',
  filterMonth: '',
})
const tableData = ref([])
const selectedName = ref('')

function handleSubmit() {
  isLoading.value = true
  if (!form.name) {
    alert('Nama karyawan harus diisi')
  } else {
    console.log('input nama sudah diisi:', form.name)
    console.log('input bulan sudah diisi:', form.filterMonth)
    selectedName.value = form.name.label
    mainStore.fetchPresencePerson(form.name.id, form.filterMonth)
  }
  isLoading.value = false
}

watch(
  () => mainStore.presenceByPerson,
  (newVal) => {
    tableData.value = newVal
  },
)

function handleReset() {
  isLoading.value = true
  form.name = ''
  form.filterMonth = ''
  selectedName.value = ''
  tableData.value = []
  // mainStore.fetchPresenceMonthly(DateFormatter.getTodayMonth())
  isLoading.value = false
}

function handleBtnExcel() {
  Export.exportToExcel(tableData.value, `Absensi_${form.name.label}-${form.filterMonth}.xlsx`)
}

function calculateJumlahJam(tableData) {
  let totalMenit = 0
  console.log(tableData)

  tableData.forEach((item) => {
    const match = item.jumlah_jam.match(/(\d+)\s*jam\s*(\d+)\s*menit/)
    if (match) {
      const jam = parseInt(match[1], 10)
      const menit = parseInt(match[2], 10)
      totalMenit += jam * 60 + menit
    }
  })

  // Konversi ke format total jam dan menit
  const totalJam = Math.floor(totalMenit / 60)
  const sisaMenit = totalMenit % 60

  return `${totalJam} jam ${sisaMenit} menit`
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountTie"
        title="Filter Berdasarkan Karyawan"
        class="-mt-4"
      />
      <component :is="'form'" class="-mb-4" @submit.prevent="handleSubmit">
        <div class="flex flex-row items-center gap-5">
          <FormField help="Pilih Karyawan untuk difilter" class="w-full">
            <FormControl
              label="Nama Karyawan"
              v-model="form.name"
              placeholder="Pilih Karyawan"
              :options="selectOptions"
              required
            />
            <FormControl
              label="Bulan"
              v-model="form.filterMonth"
              type="month"
              placeholder="Pilih Bulan"
              required
            ></FormControl>
          </FormField>
          <div class="w-fit gap-4 flex justify-end -mt-5 h-fit">
            <BaseButton type="submit" color="info" label="Submit" />
            <BaseButton type="reset" color="danger" outline label="Reset" :onclick="handleReset" />
          </div>
        </div>
      </component>

      <SectionTitleLineWithButton
        :icon="mdiTable"
        :title="`Daftar Absensi (${tableData.length})  -  ${selectedName} - ${calculateJumlahJam(tableData)}`"
      >
        <BaseButton
          @click="handleBtnExcel"
          target="_blank"
          :icon="mdiFileExcel"
          label="Export .XLSX"
          color="success"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <LoadingCircle v-if="isLoading" />
      <CardBox has-table v-else-if="tableData.length > 0 && !isLoading">
        <TableListPresencePerson :data="tableData" />
      </CardBox>
      <CardBox v-else>
        <CardBoxComponentEmpty text="Belum ada yang absen nih..." />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
