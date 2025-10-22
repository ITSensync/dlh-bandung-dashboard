<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useMainStore } from '@/stores/main'
import FormControlIcon from '@/components/FormControlIcon.vue'
import { EyeOff } from 'lucide-vue-next'
import { Eye } from 'lucide-vue-next'

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  autocomplete: {
    type: String,
    default: null,
  },
  maxlength: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  inputmode: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    default: null,
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: '',
  },
  required: Boolean,
  borderless: Boolean,
  transparent: Boolean,
  ctrlKFocus: Boolean,
})

const showPassword = ref(false)
const emit = defineEmits(['update:modelValue', 'setRef'])

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const inputElClass = computed(() => {
  const base = [
    'px-3 py-2 max-w-full focus:ring-3 focus:outline-hidden border-gray-700 rounded-sm w-full',
    'dark:placeholder-gray-400',
    computedType.value === 'textarea' ? 'h-24' : 'h-12',
    props.borderless ? 'border-0' : 'border',
    props.transparent ? 'bg-transparent' : 'bg-white dark:bg-slate-800',
  ]

  if (props.icon) {
    base.push('pl-10')
  }

  return base
})

const computedInputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return computedType.value
})

const computedType = computed(() => (props.options ? 'select' : props.type))

const controlIconH = computed(() => (props.type === 'textarea' ? 'h-full' : 'h-12'))

const mainStore = useMainStore()

const selectEl = ref(null)

const textareaEl = ref(null)

const inputEl = ref(null)

onMounted(() => {
  if (selectEl.value) {
    emit('setRef', selectEl.value)
  } else if (textareaEl.value) {
    emit('setRef', textareaEl.value)
  } else {
    emit('setRef', inputEl.value)
  }
})

if (props.ctrlKFocus) {
  const fieldFocusHook = (e) => {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault()
      inputEl.value.focus()
    } else if (e.key === 'Escape') {
      inputEl.value.blur()
    }
  }

  onMounted(() => {
    if (!mainStore.isFieldFocusRegistered) {
      window.addEventListener('keydown', fieldFocusHook)
      mainStore.isFieldFocusRegistered = true
    } else {
      // console.error('Duplicate field focus event')
    }
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', fieldFocusHook)
    mainStore.isFieldFocusRegistered = false
  })
}
</script>

<template>
  <div class="relative">
    <p v-if="label" class="text-sm font-bold mb-1 -mt-1">{{ label }}</p>
    <select
      v-if="computedType === 'select'"
      :id="id"
      v-model="computedValue"
      :name="name"
      :class="inputElClass"
    >
      <option value="" disabled selected hidden>Pilih Opsi</option>
      <option v-for="option in options" :key="option.id ?? option" :value="option">
        {{ option.label ?? option }}
      </option>
    </select>
    <textarea
      v-else-if="computedType === 'textarea'"
      :id="id"
      v-model="computedValue"
      :class="inputElClass"
      :name="name"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :required="required"
    />
    <div v-else class="relative">
      <input
        :id="id"
        ref="inputEl"
        v-model="computedValue"
        :name="name"
        :maxlength="maxlength"
        :inputmode="inputmode"
        :autocomplete="autocomplete"
        :required="required"
        :placeholder="placeholder"
        :type="computedInputType"
        :class="inputElClass"
      />

      <!-- Tombol Mata -->
      <button
        v-if="props.type === 'password'"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        @click="showPassword = !showPassword"
      >
        <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
      </button>

      <FormControlIcon v-if="icon" :icon="icon" :h="controlIconH" />
    </div>
    <FormControlIcon v-if="icon" :icon="icon" :h="controlIconH" />
  </div>
</template>
