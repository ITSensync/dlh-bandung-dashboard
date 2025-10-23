<script setup>
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import AuthToken from '@/utils/AuthToken'
import { ref } from 'vue'

const loginState = ref(AuthToken.validateAuthToken('auth-token'))

</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="pinkRed">
      <CardBox :class="cardClass">
        <div class="space-y-3 flex flex-col justify-center items-center">
          <h1 class="mb-4 font-bold font-poppins text-2xl">ERROR</h1>
          <h1 class="mb-4 font-bold font-poppins text-8xl xl:text-9xl">401</h1>

          <p class="mt-5 mb-6 text-lg font-poppins text-center">
            You dont have permission to access this page!
          </p>
          <a v-if="!loginState" href="/login" class="underline text-blue-400">Go to Login Page</a>
          <a v-else href="/summary" class="underline text-blue-400">Back to Main Page</a>
        </div>

        <!-- <template #footer>
          <BaseButtons>
            <BaseButton label="Done" to="/dashboard" color="danger" />
          </BaseButtons>
        </template> -->
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
