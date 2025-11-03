<script setup>
import { reactive } from 'vue'
import BaseButton from '../BaseButton.vue'
import CardBox from '../CardBox.vue'
import FormControl from '../FormControl.vue'
import FormField from '../FormField.vue'

const form = reactive({
  engineer: '',
  desc: '',
})

function handleReset() {
  form.engineer = ''
  form.desc = ''
  //   mainStore.fetch30Minute('daily')
  //   tableData.value = mainStore.listDaily30Minute
}
</script>

<template>
  <CardBox>
    <component :is="'form'" class="font-poppins">
      <div class="flex flex-col items-end">
        <FormField label="" class="w-full">
          <FormControl
            label="Engineer"
            type="text"
            v-model="form.engineer"
            placeholder="Masukkan Nama..."
            required
          ></FormControl>
        </FormField>
        <FormField label="" class="w-full">
          <FormControl
            label="Deskripsi Pekerjaan"
            type="textarea"
            v-model="form.desc"
            placeholder="Masukkan detail perubahan/pekerjaan yang dilakukan..."
            required
          ></FormControl>
        </FormField>
        <div class="w-full sm:w-fit gap-4 flex flex-col sm:flex-row justify-end">
          <BaseButton type="reset" color="danger" outline label="Reset" :onclick="handleReset" />
          <BaseButton type="submit" color="info" label="Tambah Baru" />
        </div>
      </div>
    </component>
  </CardBox>
</template>
