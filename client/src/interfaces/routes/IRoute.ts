import { Component } from 'vue'

interface IRoute {
    path: string,
    name: string,
    component: Component,
    props?: boolean,
    meta?: {
      title: string
    }
}

export default IRoute