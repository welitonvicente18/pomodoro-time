<template>
  <div class="flex items-center w-full h-[75%] p-2">
    <div class="w-[75%] flex justify-center">
      <button :class="classTime">
        {{ formatTime(timePomodoro) }}
      </button>
    </div>

    <div class="w-[25%] flex-row text-center align-center">
      <p class="border-2 border-blue-200 rounded-lg p-2 text-3xl text-grey">
        Pomodoros: {{ amountPomodoro }}
      </p>
      <p class="border-2 border-blue-200 rounded-lg p-2 text-3xl text-grey mt-3">
        Pausas: {{ amountPause }}
      </p>
    </div>
  </div>

  <div class="flex items-center justify-around w-full h-[25%] p-2">
    <ButtonPomodoro :textButton="buttonStart" @click="handleClick()" />
    <ButtonPomodoro textButton="Reiniciar" @click="restart()" />
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
const classTime = ref(
  'w-74 h-74 border-4 border-blue-200 text-grey-200 text-[75px] rounded-full flex items-center justify-center',
)
let interval
let notification

watch(
  () => props.duration,
  (newVal) => {
    buttonStart.value = 'Iniciar'
    timePomodoro.value = newVal * 60 * 1000
    classTime.value =
      'w-74 h-74 border-4 border-blue-200 text-grey-200 text-[75px] rounded-full flex items-center justify-center'
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
      classTime.value =
        'w-54 h-54 border-4 border-green-300 text-green-400 text-[50%] rounded-full flex items-center justify-center'
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
