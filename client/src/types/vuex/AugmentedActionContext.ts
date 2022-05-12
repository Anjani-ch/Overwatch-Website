import { ActionContext } from 'vuex'

import Mutations from './Mutations'

import IState from '@/interfaces/vuex/IState'

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IState, IState>, 'commit'>

export default AugmentedActionContext