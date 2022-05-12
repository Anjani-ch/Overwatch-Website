import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import SignupView from '../views/auth/SignupView.vue'
import HeroesView from '../views/overwatch/HeroesView.vue'
import HeroView from '../views/overwatch/HeroView.vue'
import MapsView from '../views/overwatch/MapsView.vue'
import GameModesView from '../views/overwatch/GameModesView.vue'
import HostingDocsView from '../views/HostingDocsView.vue'
import NotFoundView from '../views/NotFoundView.vue'

import IRoute from '@/interfaces/routes/IRoute'
import INavGuard from '@/interfaces/routes/INavGuard'

const routes: Array<RouteRecordRaw> & IRoute[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
    meta: {
      title: 'Signup'
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
    path: '/heroes/:id',
    name: 'Hero',
    component: HeroView,
    props: true
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
    path: '/hosting-docs',
    name: 'HostingDocs',
    component: HostingDocsView,
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

const updateTitle: INavGuard = (to, from, next) => {
  let title: string = ''

  const metaTitle: any = to.meta.title
  const routeParamKey: any = to.params.id

  if(typeof routeParamKey === 'string') {
    title = routeParamKey.toUpperCase()
  } else if(typeof metaTitle === 'string') {
    title = metaTitle
  } else {
    title = 'Hosting Docs'
  }

  document.title = `${title} | Overwatch`
  next()
}

const handleAuthRoutes: INavGuard = (to, from, next) => {
  next()
}

const handleNonAuthRoutes: INavGuard = (to, from, next) => {
  next()
}

// Update document title on route change
router.beforeEach(updateTitle)

// Handle routes that require auth
router.beforeEach(handleAuthRoutes)

// Handle routes that do not require auth
router.beforeEach(handleNonAuthRoutes)

export default router