import { MutationTree } from 'vuex'

import MutationTypes from '../enums/mutationTypes'

import Mutations from '@/types/vuex/Mutations'

import IState from '@/interfaces/vuex/IState'
import IUser from '@/interfaces/IUser'

const mutations: MutationTree<IState> & Mutations = {
    [MutationTypes.SET_USER](state, payload: IUser) {
        state.user = payload
    }
}

export default mutations