import { ActionTree } from 'vuex'

import ActionTypes from '@/enums/actionTypes'
import MutationTypes from '@/enums/mutationTypes'

import IState from '@/interfaces/vuex/IState'
import IActions from '@/interfaces/vuex/IActions'

const actions: ActionTree<IState, IState> & IActions = {
    async [ActionTypes.LOGIN_USER](context, loginData) {
        const data = {
            username: 'Test',
            email: 'test@test.com',
            password: 'test123'
        }

        context.commit(MutationTypes.SET_USER, data)
    },
    async [ActionTypes.SIGNUP_USER](context, SignupData) {
        
    }
}

export default actions