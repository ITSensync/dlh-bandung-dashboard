<script setup>
import { ref } from 'vue'
import CardBox from './CardBox.vue'

const waterLevel = ref(50)
</script>

<template>
  <CardBox>
    <div class="flex flex-col gap-4">
      <p class="font-poppins">Curah Hujan</p>
      <div class="flex flex-row w-full justify-between items-center gap-5 px-4">
        <div class="w-2/3 flex pl-8">
          <div class="water-tank">
            <div class="liquid">
              <svg
                class="water"
                viewBox="0 0 200 100"
                :style="{ top: `calc(98% - ${waterLevel}%)` }"
              >
                <defs>
                  <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0" style="stop-color: #29abe2" />
                    <stop offset="0.1643" style="stop-color: #28a6e3" />
                    <stop offset="0.3574" style="stop-color: #2496e6" />
                    <stop offset="0.5431" style="stop-color: #1e7dea" />
                    <stop offset="0.7168" style="stop-color: #1559f0" />
                    <stop offset="0.874" style="stop-color: #0b2cf7" />
                    <stop offset="1" style="stop-color: #0000ff" />
                  </linearGradient>
                </defs>
                <!--               <path
                  fill="url(#waterGradient)"
                  d="
                  M 0,0 v 100 h 200 v -100 
                  c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5
                  c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5
                  c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5
                  c -10,0 -15,5 -25,5 c -10,0 -15,-5 -25,-5
                "
                /> -->

                <path
                  fill="url(#waterGradient)"
                  d="
      M 0,0 v 100 h 200 v -100 
      c -10,0 -15,2 -25,2 c -10,0 -15,-2 -25,-2
      c -10,0 -15,2 -25,2 c -10,0 -15,-2 -25,-2
      c -10,0 -15,2 -25,2 c -10,0 -15,-2 -25,-2
      c -10,0 -15,2 -25,2 c -10,0 -15,-2 -25,-2
    "
                />

                />
              </svg>
            </div>

            <div class="indicator" data-value="75"></div>
            <div class="indicator" data-value="50"></div>
            <div class="indicator" data-value="25"></div>

            <!-- <div class="label">57%</div> -->
          </div>
        </div>
        <div class="flex flex-col font-poppins w-1/3">
          <p class="font-medium text-lg text-zinc-400">Rasio saat ini</p>
          <p class="font-bold text-lg">40 mm/jam</p>
        </div>
      </div>
    </div>
  </CardBox>
</template>

<style scoped>
body {
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.water-tank {
  width: 6em;
  height: 10em;
  border: 0.3em solid #3a3a3a;
  border-top: none;
  box-sizing: border-box;
  position: relative;
}

.water-tank .liquid {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.water-tank .liquid svg {
  height: 30em;
  /* top: calc(97.5% - 57%); */
  position: absolute;
  animation: waves 5s infinite linear;
}

@keyframes waves {
  0% {
    transform: translateX(-15em);
  }
  100% {
    transform: translateX(0);
  }
}

.water-tank .label {
  position: absolute;
  color: white;
  line-height: 2em;
  width: 4em;
  text-align: center;
  border-radius: 0.5em;
  margin-bottom: -1em;
  background-color: #3a3a3a;
  right: -4.9em;
  bottom: 57%;
}

.water-tank .label:before {
  content: '';
  position: absolute;
  background-color: #3a3a3a;
  width: 0.7em;
  height: 0.7em;
  top: 0.65em;
  left: -0.3em;
  transform: rotate(45deg);
}

.water-tank .indicator {
  position: absolute;
  background-color: #3a3a3a;
  height: 0.3em;
  width: 1em;
  margin-bottom: -0.15em;
  right: 0;
}

.water-tank .indicator[data-value='25'] {
  bottom: 25%;
}

.water-tank .indicator[data-value='50'] {
  bottom: 50%;
}

.water-tank .indicator[data-value='75'] {
  bottom: 75%;
}
</style>
