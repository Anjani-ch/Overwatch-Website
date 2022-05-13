import { createStore, Store } from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'

import IState from '@/interfaces/vuex/IState'

const store = createStore({
    state,
    mutations,
    actions
})

const useStore: Function =  () => store as Store<IState>

export {
    store as default,
    useStore
}

// https://vuex.vuejs.org/
// https://dev.to/3vilarthas/vuex-typescript-m4j