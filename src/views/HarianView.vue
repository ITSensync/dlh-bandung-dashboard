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
import Export from '@/utils/Export'
import { mdiCalendarRange, mdiFileExcel, mdiTable } from '@mdi/js'
import { computed, onMounted, reactive, ref, watch } from 'vue'

const form = reactive({
  startDate: '',
  endDate: '',
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

function handleSubmit() {
  if (!form.startDate) {
    alert('Tanggal Awal harus diisi')
  } else {
    console.log('Semua tanggal sudah diisi:', form.startDate, form.endDate)
    mainStore.fetch30Minute('daily', form.startDate, form.endDate)
  }
}

function handleReset() {
  form.startDate = ''
  form.endDate = ''
  mainStore.fetch30Minute('daily')
  tableData.value = mainStore.listDaily30Minute
}

function handleBtnExcel() {
  Export.exportToExcel(tableData.value, `30Menit_${form.startDate}-${form.endDate}.xlsx`)
}

const aggregateDailyAverage = (data) => {
  const grouped = {}

  data.forEach((item) => {
    const date = item.tanggal

    if (!grouped[date]) {
      grouped[date] = {
        count: 0,
        sum: {
          pm10: 0,
          pm25: 0,
          hc: 0,
          co: 0,
          no2: 0,
          so2: 0,
          o3: 0,
          temp: 0,
          hum: 0,
          press: 0,
          ws: 0,
          wd: 0,
          solar: 0,
          uv: 0,
          rain: 0,
        },
      }
    }

    grouped[date].count++

    // tambahkan semua nilai yang ingin di-average
    grouped[date].sum.pm10 += parseFloat(item.pm10 || 0)
    grouped[date].sum.pm25 += parseFloat(item.pm25 || 0)
    grouped[date].sum.hc += parseFloat(item.hc || 0)
    grouped[date].sum.co += parseFloat(item.co || 0)
    grouped[date].sum.no2 += parseFloat(item.no2 || 0)
    grouped[date].sum.so2 += parseFloat(item.so2 || 0)
    grouped[date].sum.o3 += parseFloat(item.o3 || 0)
    grouped[date].sum.temp += parseFloat(item.temp || 0)
    grouped[date].sum.hum += parseFloat(item.hum || 0)
    grouped[date].sum.press += parseFloat(item.press || 0)
    grouped[date].sum.ws += parseFloat(item.ws || 0)
    grouped[date].sum.wd += parseFloat(item.wd || 0)
    grouped[date].sum.solar += parseFloat(item.solar || 0)
    grouped[date].sum.rain += parseFloat(item.rain || 0)
    grouped[date].sum.uv += parseFloat(item.uv || 0)
  })

  // ubah ke array hasil rata-rata
  const result = Object.entries(grouped).map(([date, val]) => ({
    tanggal: date,
    pm10: Number((val.sum.pm10 / val.count).toFixed(1)),
    pm25: Number((val.sum.pm25 / val.count).toFixed(1)),
    hc: Number((val.sum.hc / val.count).toFixed(1)),
    co: Number((val.sum.co / val.count).toFixed(1)),
    no2: Number((val.sum.no2 / val.count).toFixed(1)),
    so2: Number((val.sum.so2 / val.count).toFixed(1)),
    o3: Number((val.sum.o3 / val.count).toFixed(1)),
    temp: Number((val.sum.temp / val.count).toFixed(1)),
    hum: Number((val.sum.hum / val.count).toFixed(1)),
    press: Number((val.sum.press / val.count).toFixed(1)),
    ws: Number((val.sum.ws / val.count).toFixed(1)),
    wd: Number((val.sum.wd / val.count).toFixed(1)),
    solar: Number((val.sum.solar / val.count).toFixed(1)),
    rain: Number((val.sum.rain / val.count).toFixed(1)),
    uv: Number((val.sum.uv / val.count).toFixed(1)),
  }))

  return result
}

const avgData = computed(() => aggregateDailyAverage(tableData.value))
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

      <SectionTitleLineWithButton :icon="mdiTable" title="Rata-Rata Harian">
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

      <CardBox has-table v-if="tableData.length > 0">
        <TableData :data="avgData" type="harian" />
      </CardBox>
      <CardBox v-else>
        <CardBoxComponentEmpty text="Tidak Ada Data ..." />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
