<script setup>
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableListPresence from '@/components/TableListPresence.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useMainStore } from '@/stores/main'
import Export from '@/utils/Export'
import { mdiCalendarRange, mdiFileExcel, mdiTable } from '@mdi/js'
import { onMounted, reactive, ref, watch } from 'vue'

const form = reactive({
  startDate: '',
  endDate: '',
})
const mainStore = useMainStore()
const tableData = ref([])
const isLoading = ref(false)

onMounted(() => {
  mainStore.fetchPresenceToday
  tableData.value = mainStore.presenceToday
})

watch(
  () => mainStore.presenceRangeByDate,
  (newVal) => {
    tableData.value = newVal
  },
)

function handleSubmit() {
  isLoading.value = true
  if (!form.startDate) {
    alert('Tanggal Awal harus diisi')
  } else {
    console.log('Semua tanggal sudah diisi:', form.startDate, form.endDate)
    mainStore.fetchRangePresence(form.startDate, form.endDate)
  }
  isLoading.value = false
}

function handleReset() {
  isLoading.value = true
  form.startDate = ''
  form.endDate = ''
  tableData.value = mainStore.presenceToday
  isLoading.value = false
}

function handleBtnExcel() {
  Export.exportToExcel(tableData.value, `Absensi_${form.startDate}-${form.endDate}.xlsx`)
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiCalendarRange"
        title="Filter Rentang Tanggal"
        class="-mt-4"
      />
      <component :is="'form'" class="-mb-4" @submit.prevent="handleSubmit">
        <div class="flex flex-row items-center gap-5">
          <FormField help="Jangan isi tanggal akhir jika untuk range data satu hari" class="w-full">
            <FormControl
              label="Tanggal Awal"
              v-model="form.startDate"
              type="date"
              placeholder="Tanggal Awal"
              required
            ></FormControl>
            <FormControl
              label="Tanggal Akhir"
              v-model="form.endDate"
              type="date"
              placeholder="Tanggal Akhir"
            ></FormControl>
          </FormField>
          <div class="w-fit gap-4 flex justify-end -mt-5">
            <BaseButton type="submit" color="info" label="Submit" />
            <BaseButton type="reset" color="danger" outline label="Reset" :onclick="handleReset" />
          </div>
        </div>
      </component>

      <SectionTitleLineWithButton :icon="mdiTable" :title="`Daftar Absensi (${tableData.length})`">
        <BaseButton
          @click="handleBtnExcel"
          target="_blank"
          :icon="mdiFileExcel"
          label="Export .XLS"
          color="success"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <LoadingCircle v-if="isLoading" />

      <CardBox has-table v-if="tableData.length > 0 && !isLoading">
        <TableListPresence :data="tableData" />
      </CardBox>
      <CardBox v-else>
        <CardBoxComponentEmpty text="Belum ada yang absen nih..." />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
