<script setup>
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableData from '@/components/TableData.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useMainStore } from '@/stores/main'
import { mdiCalendarRange, mdiTable } from '@mdi/js'
import { onMounted, reactive, ref, watch } from 'vue'

const form = reactive({
  startDate: '',
  endDate: '',
})
const mainStore = useMainStore()
const tableIspu = ref([])

onMounted(() => {
  mainStore.fetchIspuDaily('daily')
  tableIspu.value = mainStore.listDailyIspu
})

watch(
  () => mainStore.listDailyIspu,
  (newVal) => {
    tableIspu.value = newVal
  },
)

function handleSubmit() {
  if (!form.startDate) {
    alert('Tanggal Awal harus diisi')
  } else {
    // console.log('Semua tanggal sudah diisi:', form.startDate, form.endDate ?? '')
    mainStore.fetchIspuDaily('daily', form.startDate, form.endDate ?? '')
  }
}

function handleReset() {
  form.startDate = ''
  form.endDate = ''
  mainStore.fetchIspuDaily('daily')
  tableIspu.value = mainStore.listDailyIspu
}

// function handleBtnExcel() {
//   Export.exportToExcel(tableIspu.value, `ISPU_${form.startDate}-${form.endDate}.xlsx`)
// }
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiCalendarRange"
        title="Filter Rentang Tanggal"
        class="-mt-4"
      />

      <component :is="'form'" class="-mb-4 font-poppins" @submit.prevent="handleSubmit">
        <div class="flex flex-col sm:flex-row items-center gap-5">
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
          <div class="w-full sm:w-fit gap-4 flex flex-col sm:flex-row justify-end -mt-5">
            <BaseButton type="submit" color="info" label="Submit" />
            <BaseButton type="reset" color="danger" outline label="Reset" :onclick="handleReset" />
          </div>
        </div>
      </component>

      <SectionTitleLineWithButton :icon="mdiTable" title="ISPU">
        <!-- <BaseButton
          @click="handleBtnExcel"
          target="_blank"
          :icon="mdiFileExcel"
          label="Export .XLS"
          color="success"
          rounded-full
          small
        /> -->
      </SectionTitleLineWithButton>

      <CardBox has-table v-if="tableIspu.length > 0">
        <TableData type="ispu" :data="tableIspu" />
      </CardBox>
      <CardBox v-else>
        <CardBoxComponentEmpty text="Tidak ada data ..." />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
