<script setup>
import { computed, ref, watch } from 'vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps({
  checkable: Boolean,
  data: [],
})

const items = ref(props.data)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

// const checkedRows = ref([])

const itemsPaginated = computed(() =>
  items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1)),
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

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

/* const remove = (arr, cb) => {
  const newArr = []

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id)
  }
} */
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>Tanggal</th>
        <th>Mac Address</th>
        <th>Waktu Masuk</th>
        <th>Waktu Keluar</th>
        <th>Terakhir Terlihat</th>
        <th>Jumlah Jam</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(presence, index) in itemsPaginated" :key="index">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, client)" />
        <td data-label="No">
          {{ index + 1 }}
        </td>
        <td data-label="Nama">
          {{ presence.tanggal }}
        </td>
        <td data-label="Mac Address">
          {{ presence.mac_address }}
        </td>
        <td data-label="Waktu Masuk">
          {{ presence.waktu_masuk }}
        </td>
        <td data-label="Waktu Keluar">
          {{ presence.waktu_keluar }}
        </td>
        <td data-label="Terakhir Terlihat">
          {{ presence.terakhir_terlihat }}
        </td>
        <td data-label="Waktu Masuk">
          {{ presence.jumlah_jam }}
        </td>
        <!-- <td data-label="Progress" class="lg:w-32">
          <progress class="flex w-2/5 self-center lg:w-full" max="100" :value="client.progress">
            {{ client.progress }}
          </progress>
        </td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400" :title="client.created">{{
            client.created
          }}</small>
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="info" :icon="mdiEye" small @click="isModalActive = true" />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </BaseButtons>
        </td> -->
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
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
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
