<script setup>
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import FormReportIspu from '@/components/FormReportIspu.vue'
import FormReportKonsentrasi from '@/components/FormReportKonsentrasi.vue'
import FormReportWeather from '@/components/FormReportWeather.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { mdiGraph, mdiTestTube, mdiWeatherCloudy } from '@mdi/js'

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTestTube" title="Konsentrasi" class="-mt-4" />

      <FormReportKonsentrasi />

      <div class="w-full border border-slate-900/70 mt-10 mb-5"></div>
      
      <SectionTitleLineWithButton :icon="mdiGraph" title="ISPU" class="" />
      
      <FormReportIspu />
      
      <div class="w-full border border-slate-900/70 mt-10 mb-5"></div>

      <SectionTitleLineWithButton :icon="mdiWeatherCloudy" title="Cuaca" class="" />

      <FormReportWeather/>

      <!-- <SectionTitleLineWithButton :icon="mdiTable" title="Rata-Rata Harian">
        <BaseButton
          @click="handleBtnExcel"
          target="_blank"
          :icon="mdiFileExcel"
          label="Export .XLS"
          color="success"
          rounded-full
          small
        />
      </SectionTitleLineWithButton> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
