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
import IUser from '@/interfaces/IUser'

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
      title: 'Login',
      requiresAuth: false
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
    meta: {
      title: 'Signup',
      requiresAuth: false
    }
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesView,
    meta: {
      title: 'Heroes',
      requiresAuth: true
    }
  },
  {
    path: '/heroes/:id',
    name: 'Hero',
    component: HeroView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/maps',
    name: 'Maps',
    component: MapsView,
    meta: {
      title: 'Maps',
      requiresAuth: true
    }
  },
  {
    path: '/game-modes',
    name: 'GameModes',
    component: GameModesView,
    meta: {
      title: 'Game Modes',
      requiresAuth: true
    }
  },
  {
    path: '/hosting-docs',
    name: 'HostingDocs',
    component: HostingDocsView,
    meta: {
      title: 'Hosting',
      requiresAuth: true
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
  const authenticated: IUser | null = JSON.parse(localStorage.getItem('user') as string)
  const requiresAuth = to.meta.requiresAuth as boolean | undefined

  if(typeof requiresAuth === 'boolean' && !requiresAuth && authenticated) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

const handleNonAuthRoutes: INavGuard = (to, from, next) => {
  const authenticated: IUser | null = JSON.parse(localStorage.getItem('user') as string)
  const requiresAuth = to.meta.requiresAuth as boolean | undefined

  if(typeof requiresAuth === 'boolean' && requiresAuth && !authenticated) {
    next({ name: 'Login', params: {
      redirectMsg: 'You have to log in to view that page',
      redirectType: 'error',
      redirectTitle: 'Access Denied'
    }})
  } else {
    next()
  }
}

// Update document title on route change
router.beforeEach(updateTitle)

// Handle routes that require auth
router.beforeEach(handleAuthRoutes)

// Handle routes that do not require auth
router.beforeEach(handleNonAuthRoutes)

export default router