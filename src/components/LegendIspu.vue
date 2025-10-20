<script setup></script>

<template>
  <div
    class="grid grid-cols-5 gap-10 px-6 lg:px-10 md:pb-6 xl:pb-2 mt-4 md:mt-10 xl:mt-4 w-full text-center"
  >
    <div class="flex flex-col w-full gap-3 items-center">
      <div className="bg-emerald-500 rounded-full py-2 text-center w-15 md:w-25 lg:w-30 xl:w-20">
        <p class="font-bold text-[8px] md:text-lg xl:text-sm">0 - 50</p>
      </div>
      <p class="font-semibold text-[8px] md:text-lg xl:text-sm">Sehat</p>
    </div>
    <div class="flex flex-col w-full gap-3 items-center">
      <div className="bg-sky-500 rounded-full py-2 text-center w-15 md:w-25 lg:w-30 xl:w-20">
        <p class="font-bold text-[8px] md:text-lg xl:text-sm">51 - 100</p>
      </div>
      <p class="font-semibold text-[8px] md:text-lg xl:text-sm">Sedang</p>
    </div>
    <div class="flex flex-col w-full gap-3 items-center">
      <div className="bg-yellow-500 rounded-full py-2 text-center w-15 md:w-25 lg:w-30 xl:w-20">
        <p class="font-bold text-[8px] md:text-lg xl:text-sm">101 - 200</p>
      </div>
      <p class="font-semibold text-[8px] md:text-lg xl:text-sm">Tidak Sehat</p>
    </div>
    <div class="flex flex-col w-full gap-3 items-center">
      <div className="bg-red-500 rounded-full py-2 text-center w-15 md:w-25 lg:w-30 xl:w-20">
        <p class="font-bold text-[8px] md:text-lg xl:text-sm">201 - 300</p>
      </div>
      <p class="font-semibold text-[8px] md:text-lg xl:text-sm">Sangat Tidak Sehat</p>
    </div>
    <div class="flex flex-col w-full gap-3 items-center">
      <div className="bg-zinc-900 rounded-full py-2 text-center w-15 md:w-25 lg:w-30 xl:w-20">
        <p class="font-bold text-[8px] md:text-lg xl:text-sm">> 300</p>
      </div>
      <p class="font-semibold text-[8px] md:text-lg xl:text-sm">Berbahaya</p>
    </div>
  </div>
</template>

<style scoped></style>
