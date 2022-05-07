import { Component } from 'vue'

interface Route {
    path: string,
    name: string,
    component: Component,
    props?: boolean,
    meta?: {
      title: string
    }
}

export default Route