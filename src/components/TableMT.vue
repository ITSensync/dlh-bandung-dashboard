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
  <div class="overflow-x-auto rounded-lg">
    <table class="font-poppins">
      <thead>
        <tr class="text-xs">
          <th></th>
          <th>Tanggal</th>
          <th>Engineer</th>
          <th>Deskripsi Pekerjaan</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="(data, index) in itemsPaginated" :key="index" class="text-xs">
          <td data-label="No">
            {{ index + 1 }}
          </td>
          <td data-label="Tanggal">
            {{ `${DateFormatter.formatToDate(data.tanggal)}` }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
