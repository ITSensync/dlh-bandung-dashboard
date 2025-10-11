<script setup>
import CardBox from './CardBox.vue'

const props = defineProps({
  degrees: {
    type: Number,
    default: 0,
  },
  speed: {
    type: Number,
    default: 0,
  }
})
</script>

<template>
  <CardBox>
    <div class="flex flex-col h-full gap-2">
      <p class="font-poppins">Angin</p>
      <div class="w-full h-full flex flex-row justify-between items-center gap-5 px-4">
        <div class="w-2/3">
          <div class="compass">
            <!-- Arrow -->
            <svg
              class="compass__arrow"
              :style="`transform: rotate(${props.degrees}deg);`"
              width="37px"
              height="36px"
              viewBox="0 0 37 36"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="spot-search-copy-10" transform="translate(-236.000000, -796.000000)">
                  <g id="Group" transform="translate(236.000000, 796.000000)">
                    <rect id="Rectangle" opacity="0" x="0.5" y="0" width="36" height="36"></rect>
                    <polygon
                      id="Rectangle"
                      fill="#FFFFFF"
                      points="14 18 18.5 7 23 18 18.5292306 29"
                    ></polygon>
                    <polygon
                      id="Rectangle"
                      fill="#FF0000"
                      transform="translate(18.500000, 12.500000) scale(1, -1) translate(-18.500000, -12.500000) "
                      points="14 7 23 7 18.5292306 18"
                    ></polygon>
                    <circle id="Oval" fill="#000000" cx="18.5" cy="18" r="1.5"></circle>
                  </g>
                </g>
              </g>
            </svg>
            <!-- BG dots -->
            <svg
              class="compass__background"
              width="37px"
              height="36px"
              viewBox="0 0 37 36"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g font-family="sans-serif" font-size="4" fill="#FFFFFF" text-anchor="middle">
                  <!-- Utama -->
                  <text x="18.5" y="5">N</text>
                  <text x="18.5" y="35">S</text>
                  <text x="33" y="20">E</text>
                  <text x="4" y="20">W</text>

                  <!-- Diagonal -->
                  <text x="28" y="8">NE</text>
                  <text x="28" y="32">SE</text>
                  <text x="9" y="8">NW</text>
                  <text x="9" y="32">SW</text>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div class="flex flex-col gap-4 w-1/3">
          <div class="flex flex-col font-poppins">
            <p class="font-medium text-lg text-zinc-400">Arah</p>
            <p class="font-bold text-lg">{{props.degrees}}°</p>
          </div>
          <div class="flex flex-col font-poppins">
            <p class="font-medium text-lg text-zinc-400">Kecepatan</p>
            <p class="font-bold text-lg">{{ props.speed }} mph</p>
          </div>
        </div>
      </div>
    </div>
  </CardBox>
</template>

<style scoped>
.compass {
  position: relative;
  height: 150px;
  width: 150px;
}
.compass__arrow,
.compass__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
