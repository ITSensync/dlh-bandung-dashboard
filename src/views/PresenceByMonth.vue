<script setup>
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableListPresenceMonth from '@/components/TableListPresenceMonth.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useMainStore } from '@/stores/main'
import DateFormatter from '@/utils/DateFormatter'
import Export from '@/utils/Export'
import { mdiCalendarMonth, mdiFileExcel, mdiTable } from '@mdi/js'
import { onMounted, reactive, ref, watch } from 'vue'

const form = reactive({
  filterMonth: '',
})
const mainStore = useMainStore()
const isLoading = ref(false)
const tableData = ref([])
const selectedMonth = ref('')

onMounted(() => {
  mainStore.fetchPresenceMonthly(DateFormatter.getTodayMonth())
  tableData.value = mainStore.presenceMonthly
  console.log(tableData)
})

watch(
  () => mainStore.presenceMonthly,
  (newVal) => {
    tableData.value = newVal
  },
)

function handleSubmit() {
  isLoading.value = true
  if (!form.filterMonth) {
    alert('input bulan harus diisi')
  } else {
    console.log('input bulan sudah diisi:', form.filterMonth)
    selectedMonth.value = form.filterMonth
    mainStore.fetchPresenceMonthly(form.filterMonth)
    // mainStore.fetchRangePresence(form.startDate, form.endDate)
  }
  isLoading.value = false
}

function handleReset() {
  isLoading.value = true
  form.filterMonth = ''
  selectedMonth.value = ''
  mainStore.fetchPresenceMonthly(DateFormatter.getTodayMonth())
  isLoading.value = false
}

function handleBtnExcel() {
  Export.exportToExcel(tableData.value, `Absensi_bulan-${form.filterMonth}.xlsx`)
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiCalendarMonth" title="Filter Bulan" class="-mt-4" />
      <component :is="'form'" class="-mb-4" @submit.prevent="handleSubmit">
        <div class="flex flex-row items-center gap-5">
          <FormField help="Pilih bulan untuk difilter" class="w-full">
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
        :title="`Daftar Absensi  -  ${DateFormatter.convertToNamedMonth(selectedMonth ? selectedMonth : DateFormatter.getTodayMonth())}`"
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
        <TableListPresenceMonth :data="tableData" />
      </CardBox>
      <CardBox v-else>
        <CardBoxComponentEmpty text="Belum ada yang absen nih..." />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
