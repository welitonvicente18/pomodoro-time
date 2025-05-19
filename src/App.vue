<template>
  <div class="flex justify-center">
    <div class="flex flex-col justify-center w-8/12 space-y-6 mt-6">
      <!-- Header-->
      <header class="flex p-1 w-full text-2xl">
        <div class="text-3xl font-semibold">Temporizador Pomodoro</div>
      </header>

      <!-- Timer -->
      <main class="bg-sky-100 shadow-2xl rounded-lg p-5 flex flex-col space-y-4">
        <nav class="flex justify-between">
          <button
            class="w-4/12 border-2 border-solid border-blue-200 text-2xl hover:bg-blue-300 hover:text-white rounded-md p-3 active:bg-blue-500"
            @click="setDuration(25)"
          >
            Pomodoro
          </button>
          <button
            class="w-4/12 border-2 border-solid border-blue-200 text-2xl hover:bg-blue-300 hover:text-white rounded-md p-3 active:bg-blue-500"
            @click="setDuration(1)"
          >
            Pausa Curta
          </button>
          <button
            class="w-4/12 border-2 border-solid border-blue-200 text-2xl hover:bg-blue-300 hover:text-white rounded-md p-3 active:bg-blue-500"
            @click="setDuration(15)"
          >
            Pausa Longa
          </button>
        </nav>

        <!--Timer-->
        <div class="flex-row items-center justify-center h-full">
          <PomodoroTimer :duration="duration" :classTimer="colorCard" />
        </div>
      </main>
      <!-- Information -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">O que é a Técnica Pomodoro?</h2>
        <p>
          A Técnica Pomodoro é um método de gestão de tempo criado por Francesco Cirillo no final
          dos anos 1980. Seu objetivo é aumentar a produtividade e o foco durante a realização de
          tarefas, evitando distrações e o esgotamento mental.
        </p>

        <h2 class="text-2xl font-semibold">Como funciona?</h2>
        <p>
          A técnica consiste em dividir o tempo de trabalho em blocos chamados de “pomodoros”, com
          duração de 25 minutos, seguidos de 5 minutos de pausa. A cada quatro pomodoros, é feita
          uma pausa maior, de 15 a 30 minutos.
        </p>

        <h2 class="text-2xl font-semibold">Etapas da Técnica Pomodoro:</h2>
        <ul class="list-disc list-inside">
          <li>Escolha uma tarefa a ser realizada.</li>
          <li>Ajuste um cronômetro para 25 minutos.</li>
          <li>Trabalhe intensamente na tarefa até o alarme tocar.</li>
          <li>Faça uma pausa curta de 5 minutos.</li>
          <li>A cada quatro ciclos, faça uma pausa mais longa.</li>
        </ul>

        <h2 class="text-2xl font-semibold">Benefícios:</h2>
        <ul class="list-disc list-inside">
          <li>Aumenta o foco e a concentração.</li>
          <li>Reduz a fadiga mental.</li>
          <li>Ajuda no controle de distrações.</li>
          <li>Estimula o senso de urgência saudável.</li>
          <li>Melhora a gestão do tempo.</li>
        </ul>
      </section>

      <!-- footer -->
      <footer class="space-y-4  pt-4">
        <p class="text-center">Copyright © 2025  Weliton Vicente. Todos os direitos reservados.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import PomodoroTimer from '@/views/PomodoroTimer.vue'
import { ref } from 'vue'

const duration = ref(25)
const colorCard = ref()

function setDuration(newDuration) {
  duration.value = newDuration
  if (newDuration === 5) {
    colorCard.value =
      'w-74 h-74 border-4 border-green-50 bg-green-100 text-[75px] rounded-full flex items-center justify-center'
  }
  if (newDuration === 15) {
    colorCard.value =
      'w-74 h-74 border-4 border-green-100 bg-green-200 text-[75px] rounded-full flex items-center justify-center'
  }
  if (newDuration === 25) {
    colorCard.value =
      'w-74 h-74 border-4 border-blue-200 text-grey-200 text-[75px] rounded-full flex items-center justify-center'
  }
}
</script>

<style>
body {
  background-color: #fdfdfd;
  color: #2c3e50;
}
</style>
