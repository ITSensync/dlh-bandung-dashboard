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
import { mdiCalendarRange, mdiFileExcel, mdiTable } from '@mdi/js'
import { reactive, ref } from 'vue'

const form = reactive({
  startDate: '',
  endDate: '',
})

const tableIspu = ref([])
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiCalendarRange"
        title="Filter Rentang Tanggal"
        class="-mt-4"
      />

      <component :is="'form'" class="-mb-4 font-poppins">
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
            <BaseButton type="reset" color="danger" outline label="Reset" />
          </div>
        </div>
      </component>

      <SectionTitleLineWithButton :icon="mdiTable" title="ISPU - Interval 1 Jam">
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

      <CardBox has-table v-if="tableIspu >= 0">
        <TableData type="ispu" />
      </CardBox>
      <CardBox v-else>
        <CardBoxComponentEmpty text="Tidak ada data ..." />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
