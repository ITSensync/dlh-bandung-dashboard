<script setup>
import { computed, reactive, watch } from 'vue'
import BaseButton from '../BaseButton.vue'
import CardBox from '../CardBox.vue'
import FormControl from '../FormControl.vue'
import FormField from '../FormField.vue'
import { useMainStore } from '@/stores/main'

const props = defineProps({
  editedData: {
    type: Object,
    default: null,
  },
})
const mainStore = useMainStore()
const form = reactive({
  engineer: '',
  desc: '',
})

const isEditMode = computed(() => !!props.editedData)

const emit = defineEmits(['refresh'])

function handleReset() {
  form.engineer = ''
  form.desc = ''
}

async function handleSubmit() {
  if (!form.engineer || !form.desc) alert('seluruh field isian harus diisi')

  try {
    const result = isEditMode.value
      ? await mainStore.editMtReport(form.engineer, form.desc, props.editedData.id)
      : await mainStore.insertMtReport(form.engineer, form.desc)
    if (result.status === 'success') {
      form.engineer = ''
      form.desc = ''
      emit('refresh')
    } else {
      alert(result.message)
    }
  } catch (error) {
    console.error(error)
  }
}

watch(
  () => props.editedData,
  (newVal) => {
    if (newVal) {
      form.engineer = newVal.engineer || ''
      form.desc = newVal.desc || ''
    }
  },
)
</script>

<template>
  <CardBox>
    <component :is="'form'" class="font-poppins" @submit.prevent="handleSubmit">
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
          <BaseButton type="submit" color="info" :label="isEditMode ? 'Update' : 'Tambah'" />
        </div>
      </div>
    </component>
  </CardBox>
</template>
