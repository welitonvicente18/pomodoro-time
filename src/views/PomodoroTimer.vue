<template>
  <!-- Temporizador -->
  <div class="flex items-center w-full h-[75%] p-2">
    <div class="flex flex-wrap items-center justify-center gap-4 w-full">
      <button :class="classTimer">
        {{ formatTime(timePomodoro) }}
      </button>
    </div>
  </div>

  <!-- Botões de controle -->
  <div class="flex flex-wrap items-center justify-center gap-4 w-full">
    <ButtonPomodoro
      :textButton="buttonStart"
      class="w-full sm:w-5/12 md:w-1/4 text-base sm:text-xl md:text-2xl"
      @click="handleClick()"
    />
    <ButtonPomodoro
      textButton="Reiniciar"
      class="w-full sm:w-5/12 md:w-1/4 text-base sm:text-xl md:text-2xl"
      @click="restart()"
    />
  </div>

  <!-- Contadores -->
  <div class="flex flex-wrap items-center justify-center gap-4 w-full p-4">
    <p class="border border-blue-300 rounded-lg p-3 text-lg sm:text-xl md:text-2xl text-gray-700">
      Pomodoros: {{ amountPomodoro }}
    </p>
    <p class="border border-blue-300 rounded-lg p-3 text-lg sm:text-xl md:text-2xl text-gray-700">
      Pausas: {{ amountPause }}
    </p>
  </div>
</template>


<script setup>
import ButtonPomodoro from '@/components/ButtonPomodoro.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  duration: {
    type: Number,
    required: true,
    default: 25,
  },
  classTimer: {
    type: String,
    default: 'w-74 h-74 border-4 border-blue-200 text-grey-200 text-[75px] rounded-full flex items-center justify-center'
  },
})

// Solicita permissão do usuário
if (Notification.permission !== 'granted') {
  Notification.requestPermission()
} else {
  new Notification('Pomodoro finalizado!', {
    body: 'Hora de fazer uma pausa.',
    icon: '/path/to/icon.png',
  })
}

const timePomodoro = ref(props.duration * 60 * 1000)
const buttonStart = ref('Iniciar')
const amountPomodoro = ref(0)
const amountPause = ref(0)
let interval
let notification

watch(
  () => props.duration,
  (newVal) => {
    buttonStart.value = 'Iniciar'
    timePomodoro.value = newVal * 60 * 1000
    clearInterval(interval)
  },
)

function handleClick() {
  if (buttonStart.value === 'Iniciar') {
    startPomodoro()
  } else {
    pause()
  }
}

function pause() {
  clearInterval(interval)
  buttonStart.value = 'Iniciar'
}

function restart() {
  timePomodoro.value = props.duration * 60 * 1000
  buttonStart.value = 'Iniciar'
  clearInterval(interval)
}

function startPomodoro() {
  let time = timePomodoro.value

  buttonStart.value = 'Pause'

  interval = setInterval(() => {
    time -= 1000
    timePomodoro.value = time

    if (time <= 0) {
      clearInterval(interval)
      notificationEndPomodoro()
      timePomodoro.value = 0 // Finaliza o tempo
      buttonStart.value = 'Iniciar'
      if (props.duration === '25') {
        amountPomodoro.value++
      } else {
        amountPause.value++
      }
    }
  }, 1000)
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

function notificationEndPomodoro() {
  console.log()

  if (Notification.permission === 'granted') {
    notification = new Notification('Pomodoro finalizado!', {
      body: 'Hora da pausa.',
    })
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        notification = new Notification('Pomodoro finalizado!', {
          body: 'Hora da pausa.',
        })
      }
    })
  }

  // Fecha após 5 segundos (5000 ms)
  setTimeout(() => {
    notification.close()
  }, 5000)
}
</script>
