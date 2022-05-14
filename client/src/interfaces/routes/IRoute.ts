import { Component } from 'vue'

interface IRoute {
    path: string,
    name: string,
    component: Component,
    props?: boolean,
    meta?: {
      title?: string,
      requiresAuth?: boolean
    }
}

export default IRoute