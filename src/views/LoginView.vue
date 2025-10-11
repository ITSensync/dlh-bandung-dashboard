<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAlertCircleOutline, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import AuthToken from '@/utils/AuthToken'

const form = reactive({
  login: '',
  pass: '',
  remember: true,
})
const error = ref(false)

const router = useRouter()

const submit = () => {
  if (form.login === 'adminDLH' && form.pass === 'aqmsKotaBandung') {
    router.push('/summary')
    AuthToken.setAuthToken('auth-token', 'oqkwfqnfqwne2312341fmamsd', 10800000) //3 hours
  } else {
    error.value = true
    form.login = ''
    form.pass = ''
  }
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <div class="w-full flex flex-col gap-2 items-center justify-center mb-4">
          <img src="/dlh2.png" class="h-16"/>
          <p class="font-poppins font-extrabold text-xl">AQMS KOTA BANDUNG</p>
        </div>
        <FormField label="Login" help="Please enter your username">
          <FormControl
            placeholder="John Doe"
            v-model="form.login"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            placeholder="ABC123"
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <!-- <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        /> -->

        <BaseButton type="submit" color="info" label="Login" class="w-full" />

        <!-- <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template> -->
        <NotificationBar color="danger" class="mt-4" :icon="mdiAlertCircleOutline" v-if="error">
          <b>Invalid Credentials!</b> Try Again.
          <template #right> </template>
        </NotificationBar>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
