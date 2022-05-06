import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'

import HomeView from '../views/HomeView.vue'
import HeroesView from '../views/HeroesView.vue'
import MapsView from '../views/MapsView.vue'
import GameModesView from '../views/GameModesView.vue'
import NotFoundView from '../views/NotFoundView.vue'

import Route from '@/interfaces/RouteInterface'

const routes: Array<RouteRecordRaw> & Route[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesView,
    meta: {
      title: 'Heroes'
    }
  },
  {
    path: '/maps',
    name: 'Maps',
    component: MapsView,
    meta: {
      title: 'Maps'
    }
  },
  {
    path: '/game-modes',
    name: 'GameModes',
    component: GameModesView,
    meta: {
      title: 'Game Modes'
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: NotFoundView,
    meta: {
      title: '404'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Update document title on route change
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  document.title = `${to.meta.title} | Overwatch`
  next()
})

export default router