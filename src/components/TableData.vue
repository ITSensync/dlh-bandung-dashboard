<script setup>
// import { computed, ref, watch } from 'vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import { computed, ref, watch } from 'vue'
import DateFormatter from '@/utils/DateFormatter'

const props = defineProps({
  checkable: Boolean,
  data: {
    type: Array,
    default: () => [],
  },
  type: String,
})

const items = ref(props.data)

const perPage = ref(10)

const currentPage = ref(0)

const itemsPaginated = computed(() =>
  items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1)),
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageData = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

watch(
  () => props.data,
  (newVal) => {
    items.value = newVal
  },
)
</script>

<template>
  <table class="font-poppins">
    <thead>
      <tr class="text-xs">
        <th></th>
        <th>Waktu</th>
        <th>PM10</th>
        <th>PM2.5</th>
        <th>HC</th>
        <th>CO</th>
        <th>O3</th>
        <th>SO2</th>
        <th>NO2</th>
        <template v-if="props.type !== 'ispu'">
          <th>Kec. Angin</th>
          <th>Arah Angin</th>
          <th>Suhu</th>
          <th>Kelembapan</th>
          <th>Tekanan</th>
          <th>Hujan</th>
          <th>Solar Rad.</th>
          <th>UV</th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in itemsPaginated" :key="index">
        <td data-label="No">
          {{ index + 1 }}
        </td>
        <td data-label="Waktu">
          {{ `${DateFormatter.formatToDate(data.tanggal)} - ${data.jam.slice(0, 5)}` }}
        </td>
        <td data-label="PM10">
          {{ data.pm10 }}
        </td>
        <td data-label="PM10">
          {{ data.pm25 }}
        </td>
        <td data-label="HC">
          {{ data.hc }}
        </td>
        <td data-label="CO">
          {{ data.co }}
        </td>
        <td data-label="O3">
          {{ data.o3 }}
        </td>
        <td data-label="SO2">
          {{ data.so2 }}
        </td>
        <td data-label="NO2">
          {{ data.no2 }}
        </td>
        <template v-if="props.type !== 'ispu'">
          <td data-label="ws">
            {{ data.ws }}
          </td>
          <td data-label="wd">
            {{ data.wd }}
          </td>
          <td data-label="suhu">
            {{ data.temp }}
          </td>
          <td data-label="humd">
            {{ data.hum }}
          </td>
          <td data-label="press">
            {{ data.press }}
          </td>
          <td data-label="rain">
            {{ data.rain }}
          </td>
          <td data-label="sr">
            {{ data.solar }}
          </td>
          <td data-label="uv">
            {{ data.uv }}
          </td>
        </template>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 font-poppins">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageData }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
