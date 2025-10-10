<script setup>
import LineChart from './LineChart.vue'
</script>

<template>
  <div class="w-[35vw] bg-dlh_blue rounded-xl flex flex-col pt-2 pb-4">
    <p class="font-poppins text-lg font-semibold text-center mt-2">Kualitas Udara</p>
    <div class="border border-zinc-500 mt-4"></div>

    <!-- HEADER NILAI -->
    <div class="flex flex-row mt-1 gap-2">
      <div
        class="w-1/2 bg-dlh_blue_dark flex flex-col items-center justify-center font-poppins py-2"
      >
        <p class="font-semibold">Update</p>
        <p class="font-bold text-yellow-300">12 Februari 2025 00:00</p>
      </div>
      <div
        class="w-1/2 bg-dlh_blue_dark flex flex-col items-center justify-center font-poppins py-2"
      >
        <p class="font-semibold">Parameter Tertinggi</p>
        <p class="font-bold text-yellow-300">PM10</p>
      </div>
    </div>

    <!-- NILAI -->
    <div class="flex flex-row gap-2">
      <div class="w-1/2 items-center py-5 flex justify-center">
        <div class="rounded-full bg-emerald-400 h-[15vh] w-[15vh] flex justify-center items-center">
          <p class="font-poppins font-extrabold text-6xl text-center text-shadow-lg">15</p>
        </div>
      </div>

      <div class="w-1/2 flex flex-col items-center justify-center">
        <p>ICON</p>
        <p class="font-poppins font-bold text-2xl">SEHAT</p>
        <p class="font-poppins font-normal text-xs">KET</p>
      </div>
    </div>

    <!-- GRAPH PM10 -->
    <div class="w-full bg-dlh_blue_dark p-4 font-poppins">
      <div class="flex flex-row justify-between">
        <p class="font-bold text-sm">ISPU PM10 <span class="font-normal">(24 Jam)</span></p>
        <div class="flex flex-row gap-4 font-bold text-xs">
          <div class="badge badge-error">MAX: -</div>
          <div class="badge badge-accent">MIN: -</div>
          <div class="badge badge-success">AVG: -</div>
        </div>
      </div>
      <div class="">
        <LineChart />
      </div>
    </div>
    <div class="w-full bg-dlh_blue_dark p-4 font-poppins mt-4">
      <div class="flex flex-row justify-between">
        <p class="font-bold text-sm">ISPU PM2.5 <span class="font-normal">(24 Jam)</span></p>
        <div class="flex flex-row gap-4 font-bold text-xs">
          <div class="badge badge-error">MAX: -</div>
          <div class="badge badge-accent">MIN: -</div>
          <div class="badge badge-success">AVG: -</div>
        </div>
      </div>
      <div>
        <LineChart />
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* 8px */
  border-radius: 0.25rem; /* sesuaikan sesuai kebutuhan */
  vertical-align: middle;
  color: #1f2937; /* base-content */
  border: 1px solid #f2f2f2; /* base-200 */
  font-size: 0.875rem; /* 14px */
  width: fit-content;
  padding-inline: calc(0.75rem - 1px);
  background-size: auto;
  background-color: #ffffff; /* base-100 */
  height: 1.5rem; /* contoh ukuran */
}

.badge-error {
  --badge-color: #dc2626; /* error */
  --badge-fg: #ffffff; /* error-content */
  background-color: var(--badge-color);
  color: var(--badge-fg);
  border-color: var(--badge-color);
}

.badge-accent {
  --badge-color: #37cdbe; /* accent */
  --badge-fg: #163835; /* accent-content */
  background-color: var(--badge-color);
  color: var(--badge-fg);
  border-color: var(--badge-color);
}

.badge-success {
  --badge-color: #16a34a; /* success */
  --badge-fg: #ffffff; /* success-content */
  background-color: var(--badge-color);
  color: var(--badge-fg);
  border-color: var(--badge-color);
}
</style>
