import { createApp } from 'vue'

import App from './App.vue'

import router from './router'

import './assets/tailwind.css'
import 'tw-elements'

import 'video.js/dist/video-js.min.css'
import 'video.js'
import 'videojs-youtube'

createApp(App)
    .use(router)
    .mount('#app')