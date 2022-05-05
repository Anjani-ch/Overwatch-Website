import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import HeroesView from '../views/HeroesView.vue'
import MapsView from '../views/MapsView.vue'
import GameModesView from '../views/GameModesView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesView
  },
  {
    path: '/maps',
    name: 'Maps',
    component: MapsView
  },
  {
    path: '/game-modes',
    name: 'GameModes',
    component: GameModesView
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router