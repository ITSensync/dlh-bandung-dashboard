<script setup>
import FormMtReport from '@/components/Admin/FormMtReport.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableMT from '@/components/TableMT.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useMainStore } from '@/stores/main'
import { mdiTable, mdiWrenchCheck } from '@mdi/js'
import { ref } from 'vue'

const mainStore = useMainStore()
const tableData = ref([])
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiWrenchCheck" title="Form Maintenance" class="-mt-8" />

      <FormMtReport />

      <SectionTitleLineWithButton :icon="mdiTable" title="Maintenance">
        <!-- <BaseButton
          target="_blank"
          :icon="mdiFileExcel"
          label="Export .XLS"
          color="success"
          rounded-full
          small
        /> -->
      </SectionTitleLineWithButton>

      <CardBox has-table v-if="tableData.length >= 0">
        <TableMT :data="[]" />
      </CardBox>
      <CardBox v-else>
        <CardBoxComponentEmpty text="Tidak ada data ..." />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
