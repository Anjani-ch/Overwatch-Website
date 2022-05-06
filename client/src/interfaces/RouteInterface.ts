import { Component } from 'vue'

interface Route {
    path: string,
    name: string,
    component: Component,
    meta: {
      title: string
    }
}

export default Route