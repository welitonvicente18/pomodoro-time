<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-sky-100 shadow-lg rounded-lg p-5 w-8/12 h-9/12 flex flex-col">
      <div>
        <nav class="flex border-b border-b-sky-200 w-full p-2 text-center">
          <button class="w-4/12 text-2xl hover:bg-blue-300 hover:text-white rounded-md p-3" @click="setDuration(25)">Pomodoro</button>
          <button class="w-4/12 text-2xl hover:bg-blue-300 hover:text-white rounded-md p-3" @click="setDuration(5)">Pausa Curta</button>
          <button class="w-4/12 text-2xl hover:bg-blue-300 hover:text-white rounded-md p-3" @click="setDuration(15)">Pausa Longa</button>
        </nav>
      </div>
      <div class="flex-row items-center justify-center flex-1 h-full">
        <PomodoroTimer :duration="duration"/>
      </div>
    </div>
  </div>
</template>

<script setup>

import PomodoroTimer from '@/views/PomodoroTimer.vue'
import { ref } from 'vue'

const duration = ref(25)

function setDuration(newDuration){
  duration.value = newDuration
}
</script>
