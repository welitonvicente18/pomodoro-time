import { createRouter, createWebHistory } from 'vue-router'

import PomodoroTimer from '../views/PomodoroTimer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PomodoroTimer',
      component: PomodoroTimer,
    }
  ],
})

export default router
