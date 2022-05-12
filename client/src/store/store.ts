import { createStore } from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'

const store = createStore({
    state,
    mutations,
    actions
})

export default store

// https://vuex.vuejs.org/
// https://dev.to/3vilarthas/vuex-typescript-m4j